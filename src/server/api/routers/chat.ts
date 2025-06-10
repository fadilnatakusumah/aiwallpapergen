import { User } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
  myChats: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(10), // Items per page
        deviceId: z.string().optional(), // Cursor for pagination
        cursor: z.string().optional(), // Cursor for pagination
      }),
    )
    .query(async ({ input, ctx }) => {
      const { limit, cursor } = input;

      let user: Partial<User> | User =
        ctx.session.user ??
        (await ctx.db.user.findFirst({
          where: {
            device_uuid: input.deviceId,
          },
        }));

      const chats = await ctx.db.chat.findMany({
        where: {
          user_id: user?.id,
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          created_at: "desc",
        },
        include: {
          wallpapers: {
            include: {
              prompt: true,
              user: true,
            },
          },
        },
      });
      console.log("🚀 ~ .query ~ chats:", chats);

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
  updateChatName: publicProcedure
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
      return updateChat;
    }),
});
