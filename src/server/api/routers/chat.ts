import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
  myChats: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(10), // Items per page
        cursor: z.string().optional(), // Cursor for pagination
      }),
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;
      const chats = await ctx.db.chat.findMany({
        where: {
          user_id: ctx.session.user.id,
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          created_at: "desc",
        },
        include: {
          wallpapers: true,
        },
      });

      let nextCursor: string | null = null;
      if (chats.length > limit) {
        const nextChat = chats.pop(); // Remove the extra item
        nextCursor = nextChat?.id ?? null;
      }

      return {
        chats,
        nextCursor,
      };
    }),
  updateChatName: protectedProcedure
    .input(
      z.object({
        chatId: z.string(), // Items per page
        name: z.string(), // Cursor for pagination
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { chatId, name } = input;

      const updateChat = await ctx.db.chat.update({
        where: { id: chatId },
        data: { title: name },
      });
      // Update the chat name here
      console.log("🚀 ~ .mutation ~ updateChat:", updateChat);
      return updateChat;
    }),

  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //         createdBy: { connect: { id: ctx.session.user.id } },
  //       },
  //     });
  //   }),

  // getLatest: protectedProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });

  //   return post ?? null;
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});


// export type MyChat = inferProcedureOutput<
//   (typeof wallpaperRouter)["generateWallpaper"]
// >;
