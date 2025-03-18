"use client";

import { Prompt, User, Wallpaper } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

import { SpinnerGenerateWallpaper } from "~/components/customs/Spinners";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { WallpaperModal } from "~/components/WallpaperModal";

import { useInfiniteMyWallpapers } from "~/hooks/wallpapers";
import { pageview } from "~/lib/gtag";

function ExplorePage() {
  pageview("/explore");

  const session = useSession();
  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,

    fetchNextPage,
    // refetch,
  } = useInfiniteMyWallpapers();
  type WallpaperState = Wallpaper & { prompt: Prompt; user: User };

  const [selectedWallpaper, setSelectedWallpaper] =
    useState<WallpaperState | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, inView } = useInView();

  const openModal = (wallpaper: WallpaperState) => {
    setSelectedWallpaper(wallpaper);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Trigger fetching when the "load more" element is visible
  useEffect(() => {
    (async () => {
      if (inView && hasNextPage) {
        await fetchNextPage?.();
      }
    })().catch(console.error);
  }, [inView, hasNextPage, fetchNextPage]);

  const wallpapers = useMemo(() => {
    return data?.pages.flatMap((page) =>
      page.wallpapers.flatMap((wallpaper) => wallpaper),
    );
  }, [data?.pages.length, data?.pages[0]?.wallpapers.length]);

  const isAuthenticated = session.data?.user.id;

  return (
    <div className="container h-full w-full p-4">
      {isLoading || !wallpapers?.length ? (
        <div className="flex h-full w-full flex-grow items-center justify-center">
          {isLoading ? (
            <SpinnerGenerateWallpaper />
          ) : (
            <div className="max-w-2xl px-4 text-center">
              <h1 className="text-2xl font-semibold text-slate-800">
                Sign in first
              </h1>
              <p className="mt-2 text-sm text-slate-700">
                You have to Sign in first before you can see other people's
                wallpapers.
              </p>

              <Link
                href={isAuthenticated ? "/c/" : "/auth"}
                className="mt-4 block"
              >
                <Button>
                  {isAuthenticated
                    ? `Create Your First Wallpaper`
                    : `Sign in here`}
                </Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.pages.flatMap(
            (page) =>
              page.wallpapers.map((wallpaper) => (
                <div
                  key={wallpaper.id}
                  className="group relative cursor-pointer overflow-hidden rounded-xl bg-white transition-all duration-300 hover:shadow-[0_10px_20px_rgba(120,_58,_180,_0.3)]"
                  onClick={() => openModal(wallpaper)}
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={wallpaper.url || "/placeholder.svg"}
                      alt={wallpaper.prompt.prompt_sent}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="absolute right-3 top-3">
                      <Badge className="bg-white/80 text-slate-800 hover:bg-white/90">
                        {wallpaper.user.username}
                      </Badge>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                      <h3 className="mb-1 text-lg font-semibold text-white">
                        {wallpaper.prompt.prompt.substring(0, 24)}
                      </h3>
                      <p className="mb-2 line-clamp-2 text-sm text-white/90">
                        {wallpaper.prompt.prompt}
                      </p>

                      {/* TODO Add Likes Feature */}
                      {/* <div className="flex items-center gap-1 text-sm text-white/90">
                        <Heart className="h-4 w-4 fill-pink-500 text-pink-500" />
                        <span>{wallpaper.likes.length}</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              )),

            <div ref={ref}>
              {
                isFetchingNextPage ? (
                  <Spinner size={"large"} />
                ) : hasNextPage ? null : null // <p>Scroll to load more</p>
              }
            </div>,
          )}
        </div>
      )}

      {selectedWallpaper && (
        <WallpaperModal
          isOpen={isModalOpen}
          onClose={closeModal}
          wallpaper={selectedWallpaper}
        />
      )}
    </div>
  );
}

export default ExplorePage;
