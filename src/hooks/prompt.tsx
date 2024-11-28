import React from "react";
import { api } from "~/trpc/react";

export function useInfinitePrompt({ id }: { id: string }) {
  return api.prompt.getPrompts.useInfiniteQuery(
    {
      limit: 50, // Number of chats per page
      id,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor, // Use nextCursor for fetching more
    },
  );
}
