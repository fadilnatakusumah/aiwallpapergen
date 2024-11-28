import React from "react";
import { api } from "~/trpc/react";

export function useInfiniteChats() {
  return api.chat.myChats.useInfiniteQuery(
    {
      limit: 50, // Number of chats per page
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor, // Use nextCursor for fetching more
    },
  );
}
