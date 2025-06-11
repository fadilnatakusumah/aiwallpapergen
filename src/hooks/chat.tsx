"use client";

import { getDeviceUUID } from "~/lib/device";
import { api } from "~/trpc/react";

export function useInfiniteChats({
  // enabled = true,
}: { enabled?: boolean } = {}) {
  return api.chat.myChats.useInfiniteQuery(
    {
      limit: 50, // Number of chats per page
      deviceId: getDeviceUUID(),
    },
    {
      // enabled,
      staleTime: 1000 * 60 * 5, // data considered fresh for 5 minutes
      refetchOnWindowFocus: false, // do not refetch on window focus
      getNextPageParam: (lastPage) => lastPage.nextCursor, // Use nextCursor for fetching more
    },
  );
}
