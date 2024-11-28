import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  // protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const promptRouter = createTRPCRouter({
  getPrompts: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        limit: z.number().min(1).max(50).default(10), // Items per page
        cursor: z.string().optional(), // C
      }),
    )
    .query(async ({ input, ctx }) => {
      const { id, limit, cursor } = input;
      const myPrompts = await ctx.db.prompt.findMany({
        where: {
          user_id: ctx.session.user.id,
          chat_id: id,
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
      if (myPrompts.length > limit) {
        const nextPrompt = myPrompts.pop(); // Remove the extra item
        nextCursor = nextPrompt?.id ?? null;
      }

      return {
        prompts: myPrompts,
        nextCursor,
      };
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
