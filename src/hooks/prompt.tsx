"use client";
import { api } from "~/trpc/react";

export function useInfinitePrompt({
  id,
  enabled,
}: {
  id: string;
  enabled?: boolean;
}) {
  return api.prompt.getPrompts.useInfiniteQuery(
    {
      id,
      // cursor: null, // <-- optional you can pass an initialCursor
      limit: 10,
    },
    {
      enabled,
      staleTime: 1000 * 60 * 5, // data considered fresh for 5 minutes
      refetchOnWindowFocus: false, // do not refetch on window focus
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // initialCursor: 1, // <-- optional you can pass an initialCursor
    },
  );
}
