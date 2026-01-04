import { faker } from "@faker-js/faker";
import { type Chat, type User } from "@prisma/client";
import { TRPCError, type inferProcedureOutput } from "@trpc/server";
import { serialize } from "cookie";
import { z } from "zod";
import { WALLPAPERS_PROMPT, WALLPAPERS_TYPE } from "~/data/prompt";

import { signJwt } from "~/lib/jwt";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { uploadToS3 } from "~/server/utils/aws";
import { optimizeImage } from "~/server/utils/image";
import { openai } from "~/server/utils/openai";
import { generateAccessURLWallpaper } from "~/server/utils/string";

export const wallpaperRouter = createTRPCRouter({
  generateWallpaper: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
        type: z.nativeEnum(WALLPAPERS_TYPE).optional().nullable(),
        chatId: z.string().optional(),
        userId: z.string().optional(),
        deviceUuid: z.string().optional(),
        deviceInfo: z.string().optional(),
        amount: z.number().optional().default(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.db
          .$transaction(
            async (prisma) => {
              let user = null;
              if (!input.userId) {
                if (input.deviceUuid) {
                  user = await prisma.user.findFirst({
                    where: {
                      device_uuid: input.deviceUuid,
                    },
                  });
                }

                if (!user?.id) {
                  user = await prisma.user.create({
                    data: {
                      email: "",
                      google_id: "",
                      profile_picture: faker.image.avatar(),
                      name: faker.person.fullName(), // Can be modified to generate username
                      username: faker.internet.email().split("@")[0]!, // Can be modified to generate username
                      credits: 10,
                      device_uuid: input.deviceUuid,
                      device_info: input.deviceInfo,
                    },
                  });
                }

                // Create a signed JWT (if session not exists)
                if (!ctx.session) {
                  const token = signJwt({
                    sub: user.id,
                    name: user.name,
                    deviceUuid: input.deviceUuid,
                  });

                  const cookie = serialize("next-auth.session-token", token, {
                    path: "/",
                    httpOnly: true,
                    sameSite: "lax",
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                  });

                  ctx.headers.set("Set-Cookie", cookie);
                }

                Object.assign(ctx, { session: { ...ctx.session, user } });
              }

              if (input.amount > 4 || input.amount <= 0) {
                throw new TRPCError({
                  code: "BAD_REQUEST",
                  message: "Invalid amount of wallpapers",
                });
              }

              let currentChat: Chat | null;

              if (!input.chatId) {
                currentChat = await prisma.chat.create({
                  data: {
                    user_id: ctx.session.user.id,
                    title: input.prompt.substring(0, 24),
                  },
                });
              } else {
                currentChat = await prisma.chat.findFirst({
                  where: {
                    id: input.chatId,
                  },
                });

                if (!currentChat?.id) {
                  currentChat = await prisma.chat.create({
                    data: {
                      user_id: ctx.session.user.id,
                      title: input.prompt.substring(0, 24),
                    },
                  });
                }
              }

              // update the credits while checking if it has enough credits
              const userUpdateMany = await prisma.user.updateMany({
                where: {
                  id: ctx.session.user.id,
                  credits: {
                    gte: input.amount,
                  },
                },
                data: {
                  credits: { decrement: input.amount },
                },
              });

              const { count } = userUpdateMany;
              if (count <= 0) {
                throw new TRPCError({
                  code: "BAD_REQUEST",
                  message: "You don't have enough credits",
                });
              }

              // const isMocking = env.MOCK_API === "true";

              // if (isMocking && currentChat?.id) {
              //   const sentPrompt = input.type
              //     ? WALLPAPERS_PROMPT[input.type](input.prompt)
              //     : input.prompt;

              //   const addedPrompt = await prisma.prompt.create({
              //     data: {
              //       prompt: input.prompt,
              //       prompt_sent: sentPrompt,
              //       user_id: ctx.session.user.id,
              //       refined_prompt: sentPrompt,
              //       chat_id: input.chatId ?? currentChat.id,
              //     },
              //   });

              //   const createWallpaper = await prisma.wallpaper.create({
              //     data: {
              //       user_id: ctx.session.user.id,
              //       url: "https://ai-wallpaper-generator.s3.ap-southeast-2.amazonaws.com/wallpapers/cm3bpa89v0000aihtbvkcmozt/1731488453697.jpg",
              //       chat_id: input.chatId ?? currentChat.id,
              //       prompt_id: addedPrompt.id,
              //       type: input.type ?? "",
              //     },
              //   });
              //   return {
              //     chat: currentChat,
              //     wallpaper: createWallpaper,
              //     addedPrompt: addedPrompt,
              //   };
              // }

              const sentPrompt = input.type
                ? WALLPAPERS_PROMPT[input.type](input.prompt)
                : input.prompt;

              const generatedImages = await Promise.all(
                [...Array(input.amount)].map((_) => {
                  const variation = ` with variation ${Math.random().toFixed(2)}`; // small random modifier
                  const finalPrompt = sentPrompt + variation;

                  return openai.images.generate({
                    model: "dall-e-3",
                    prompt: finalPrompt,
                    n: 1,
                    size: "1792x1024", // or 1792x1024",
                    response_format: "b64_json",
                  });
                }),
              );

              const compressedImages = await Promise.all(
                generatedImages.map(async (item) =>
                  optimizeImage(Buffer.from(item.data[0]!.b64_json!, "base64")),
                ),
              );

              const urlWallpapers = await Promise.all(
                compressedImages.map((item) =>
                  uploadToS3(
                    // Buffer.from(item.data[0]?.b64_json!, "base64"),
                    item,
                    sentPrompt,
                    ctx.session.user.id,
                  ),
                ),
              );

              const addedPrompt = await prisma.prompt.create({
                data: {
                  prompt: input.prompt,
                  prompt_sent: sentPrompt,
                  user_id: ctx.session.user.id,
                  refined_prompt: generatedImages[0]!.data[0]!.revised_prompt!,
                  chat_id: currentChat.id, // Added default value for chat_id
                },
              });

              const createWallpapers = await Promise.all(
                urlWallpapers.map((urlWallpaper) => {
                  return prisma.wallpaper.create({
                    data: {
                      user_id: ctx.session.user.id,
                      url: urlWallpaper,
                      chat_id: currentChat.id,
                      prompt_id: addedPrompt.id, // Added default value for prompt_id
                      type: input.type ?? "",
                    },
                  });
                }),
              );

              return {
                chat: currentChat,
                wallpapers: createWallpapers,
                addedPrompt: addedPrompt,
              };
            },
            {
              maxWait: 60000,
              timeout: 60000,
            },
          )
          .then(({ chat, wallpapers, addedPrompt }) => {
            return {
              message: "success",
              data: {
                chat_id: chat.id,
                chat_title: chat.title,
                wallpapers: wallpapers,
                created_at: chat.created_at,
                prompt: addedPrompt.prompt,
                user_id: ctx.session.user.id,
              },
            };
          })
          .catch((err) => {
            console.log("🚀 ~ .mutation ~ err:", err);
            throw err;
          });
      } catch (error) {
        console.log("🚀 ~ .mutation ~ error:", error);
        if (error instanceof TRPCError) {
          throw error; // Re-throw TRPCErrors to ensure proper message propagation
        }

        // Handle any unexpected errors
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred during wallpaper generation.",
        });
      }
    }),

  getAllMyWallpapers: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(10), // Items per page
        cursor: z.string().optional(), // Cursor for pagination
        deviceId: z.string().optional(), // Cursor for pagination
        isExplore: z.boolean().optional().default(false),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, isExplore } = input;

      const user: Partial<User> | User =
        ctx.session.user ??
        (await ctx.db.user.findFirst({
          where: {
            device_uuid: input.deviceId,
          },
        }));

      const wallpapers = await ctx.db.wallpaper.findMany({
        where: {
          ...(!isExplore ? { user_id: user.id } : {}),
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          created_at: "desc",
        },
        include: {
          prompt: true,
          user: true,
          likes: true,
        },
        omit: {
          url: true,
        },
      });

      let nextCursor: string | null = null;
      if (wallpapers.length > limit) {
        const nextChat = wallpapers.pop(); // Remove the extra item
        nextCursor = nextChat?.id ?? null;
      }
      // Transform each wallpaper object to override the URL
      const transformedWallpapers = wallpapers.map((wallpaper) => ({
        ...wallpaper,
        url: generateAccessURLWallpaper(wallpaper.id),
      }));

      return {
        wallpapers: transformedWallpapers,
        nextCursor,
      };
    }),

  // exploreAllWallpapers: protectedProcedure
  //   .input(
  //     z.object({
  //       limit: z.number().min(1).max(50).default(10), // Items per page
  //       cursor: z.string().optional(), // Cursor for pagination
  //     }),
  //   )
  //   .query(async ({ ctx, input }) => {
  //     const { limit, cursor } = input;
  //     const wallpapers = await ctx.db.wallpaper.findMany({
  //       take: limit + 1,
  //       cursor: cursor ? { id: cursor } : undefined,
  //       orderBy: {
  //         created_at: "desc",
  //       },
  //       include: {
  //         prompt: true,
  //         user: true,
  //       },
  //       omit: {
  //         url: true,
  //       },
  //     });

  //     let nextCursor: string | null = null;
  //     if (wallpapers.length > limit) {
  //       const nextChat = wallpapers.pop(); // Remove the extra item
  //       nextCursor = nextChat?.id ?? null;
  //     }

  //     const transformedWallpapers = wallpapers.map((wallpaper) => ({
  //       ...wallpaper,
  //       url: generateAccessURLWallpaper(wallpaper.id),
  //     }));

  //     return {
  //       wallpapers: transformedWallpapers,
  //       nextCursor,
  //     };
  //   }),
});

export type GenerateWallpaper = inferProcedureOutput<
  (typeof wallpaperRouter)["generateWallpaper"]
>;
