import { type inferProcedureOutput, TRPCError } from "@trpc/server";
import { z } from "zod";
import { WALLPAPERS_PROMPT, WALLPAPERS_TYPE } from "~/data/prompt";
import { env } from "~/env";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { uploadToS3 } from "~/server/utils/aws";
import { openai } from "~/server/utils/openai";

export const wallpaperRouter = createTRPCRouter({
  generateWallpaper: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        type: z.nativeEnum(WALLPAPERS_TYPE).optional(),
        chatId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.db
          .$transaction(
            async (prisma) => {
              let currentChat;
              console.log("🚀 ~ .mutation ~ input:", input);

              if (!input.chatId) {
                currentChat = await prisma.chat.create({
                  data: {
                    user_id: ctx.session.user.id,
                    title: input.prompt.substring(0, 10),
                  },
                });
              } else {
                currentChat = await prisma.chat.findFirst({
                  where: {
                    id: input.chatId,
                  },
                });
              }
              console.log("🚀 ~ .$transaction ~ currentChat:", currentChat);

              const userUpdateMany = await prisma.user.updateMany({
                where: {
                  id: ctx.session.user.id,
                  credits: {
                    gte: 1,
                  },
                },
                data: {
                  credits: { decrement: 1 },
                },
              });

              const isMocking = env.MOCK_API === "true";

              if (isMocking && currentChat?.id) {
                const sentPrompt = input.type
                  ? WALLPAPERS_PROMPT[input.type](input.prompt)
                  : input.prompt;

                const addedPrompt = await prisma.prompt.create({
                  data: {
                    prompt: input.prompt,
                    prompt_sent: sentPrompt,
                    user_id: ctx.session.user.id,
                    refined_prompt: sentPrompt,
                    chat_id: input.chatId ?? currentChat.id,
                  },
                });

                const createWallpaper = await prisma.wallpaper.create({
                  data: {
                    user_id: ctx.session.user.id,
                    url: "https://ai-wallpaper-generator.s3.ap-southeast-2.amazonaws.com/wallpapers/cm3bpa89v0000aihtbvkcmozt/1731488453697.jpg",
                    chat_id: input.chatId ?? currentChat.id,
                    prompt_id: addedPrompt.id,
                    type: input.type ?? "",
                  },
                });
                return {
                  chat: currentChat,
                  wallpaper: createWallpaper,
                  addedPrompt: addedPrompt,
                };
              }

              const { count } = userUpdateMany;
              if (count <= 0) {
                throw new TRPCError({
                  code: "BAD_REQUEST",
                  message: "You don't have enough credits",
                });
              }

              const sentPrompt = input.type
                ? WALLPAPERS_PROMPT[input.type](input.prompt)
                : input.prompt;

              const data = await openai.images.generate({
                model: "dall-e-3",
                prompt: sentPrompt,
                n: 1,
                size: "1792x1024",
                response_format: "b64_json",
              });

              const urlWallpaper = await uploadToS3(
                Buffer.from(data.data[0]!.b64_json!, "base64"),
                sentPrompt,
                ctx.session.user.id,
              );

              const addedPrompt = await prisma.prompt.create({
                data: {
                  prompt: input.prompt,
                  prompt_sent: sentPrompt,
                  user_id: ctx.session.user.id,
                  refined_prompt: data.data[0]!.revised_prompt!,
                  chat_id: input.chatId ?? currentChat?.id ?? "", // Added default value for chat_id
                },
              });
              console.log("🚀 ~ .$transaction ~ addedPrompt:", addedPrompt);

              const createWallpaper = await prisma.wallpaper.create({
                data: {
                  user_id: ctx.session.user.id,
                  url: urlWallpaper,
                  chat_id: input.chatId ?? currentChat?.id ?? "",
                  prompt_id: addedPrompt.id,
                  type: input.type ?? "",
                },
              });
              console.log(
                "🚀 ~ .$transaction ~ createWallpaper:",
                createWallpaper,
              );

              return {
                chat: currentChat,
                wallpaper: createWallpaper,
                addedPrompt: addedPrompt,
              };
            },
            {
              maxWait: 30000,
              timeout: 60000,
            },
          )
          .then(({ chat, wallpaper, addedPrompt }) => {
            return {
              message: "success",
              data: {
                chat_id: chat?.id,
                chat_title: chat?.title,
                wallpaper_id: wallpaper?.id,
                id: wallpaper.id,
                created_at: wallpaper?.created_at,
                prompt: addedPrompt?.prompt,
                user_id: ctx.session.user.id,
                url_wallpaper: wallpaper?.url,
              },
            };
          })
          .catch((err) => {
            throw err;
          });
      } catch (error) {
        console.log("🚀 ~ .mutation ~ error:", error);
        // ctx.db.$rollback();
        // console.log("🚀 ~ .mutation ~ error:", error);
        // throw new TRPCError({
        //   code: "INTERNAL_SERVER_ERROR",
        //   message: error as string,
        // });
        // console.error("Error during wallpaper generation:", error);

        if (error instanceof TRPCError) {
          console.log("🚀 ~ .mutation ~ TRPCError:", error);
          throw error; // Re-throw TRPCErrors to ensure proper message propagation
        }

        console.log("Unexpected error");

        // Handle any unexpected errors
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred during wallpaper generation.",
        });
      } finally {
        console.log("FINALLY");
      }
      // const finalPrompt = ""

      // if(true)
      // let result: Prisma.TransactionDelegate;
      // try {
      //    results = db.transaction([

      //   ])
      //   const imageBuffer = await someAIService.generateWallpaper(input.prompt); // OpenAI model output
      // } catch (error) {
      //   result.

      // }finally {

      //   return {
      //     message: "",
      //   };
      // }
    }),
});

export type GenerateWallpaper = inferProcedureOutput<
  (typeof wallpaperRouter)["generateWallpaper"]
>;
