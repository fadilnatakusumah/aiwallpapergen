"use client";

import { api } from "~/trpc/react";

export function useInfiniteMyWallpapers() {
  return api.wallpaper.getAllMyWallpapers.useInfiniteQuery(
    {
      limit: 50, // Number of chats per page
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor, // Use nextCursor for fetching more
    },
  );
}
