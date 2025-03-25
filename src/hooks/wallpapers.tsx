"use client";

import { api } from "~/trpc/react";

export function useInfiniteMyWallpapers({
  isExplore,
}: { isExplore?: boolean } = {}) {
  return api.wallpaper.getAllMyWallpapers.useInfiniteQuery(
    {
      limit: 50, // Number of chats per page
      isExplore,
    },
    {
      staleTime: 1000 * 60 * 5, // data considered fresh for 5 minutes
      refetchOnWindowFocus: false, // do not refetch on window focus
      getNextPageParam: (lastPage) => lastPage.nextCursor, // Use nextCursor for fetching more
    },
  );
}
