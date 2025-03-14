"use client";
import { api } from "~/trpc/react";

export function useInfinitePrompt({ id }: { id: string }) {
  return api.prompt.getPrompts.useInfiniteQuery(
    {
      id,
      // cursor: null, // <-- optional you can pass an initialCursor
      limit: 10,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    },
  );
}
