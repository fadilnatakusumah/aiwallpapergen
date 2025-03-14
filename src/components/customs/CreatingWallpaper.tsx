"use client";

import { TRPCClientError } from "@trpc/client";
import clsx from "clsx";
import { BanIcon, Stars } from "lucide-react";
import Image from "next/image";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { PhotoSlider } from "react-photo-view";

import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Spinner } from "~/components/ui/spinner";
import { Textarea } from "~/components/ui/textarea";
import { SpinnerGenerateWallpaper } from "./Spinners";

import "react-photo-view/dist/react-photo-view.css";
import { toast } from "sonner";
import { SUGGESTION_TYPE_URL, WALLPAPERS_TYPE } from "~/data/prompt";
import { useInfinitePrompt } from "~/hooks/prompt";
import { api } from "~/trpc/react";

export default function CreateWallpaper() {
  const params = useParams<{ id: string }>();
  const { isLoading, data, refetch } = params?.id
    ? useInfinitePrompt({ id: params.id as string })
    : {};

  const [form, setForm] = useState({
    prompt: "",
    amount: 1,
  });
  const session = useSession();
  const router = useRouter();

  const [wallpaperType, setWallpaperType] = useState<WALLPAPERS_TYPE>();
  const [isShowPreview, setShowPreview] = useState(false);
  const [index, setIndex] = useState(0);

  const generateWallpaperAPI = api.wallpaper.generateWallpaper.useMutation({
    onSuccess(data) {
      scrollToBottom();
      if (params?.id) {
        refetch?.().catch(console.error);
      } else {
        router.push(`/c/${data.data.chat_id}`);
      }
    },
    onError(error) {
      if (error instanceof TRPCClientError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
    async onSettled() {
      await session.update();
      setForm({ prompt: "", amount: 1 });
    },
  });

  const isSubmitting = generateWallpaperAPI.status === "pending";
  const isAuthenticated = session.data?.user;
  const isDisabled = isSubmitting || !isAuthenticated;

  function generate() {
    scrollToBottom();
    generateWallpaperAPI.mutate({
      prompt: form.prompt,
      type: wallpaperType! || null,
      amount: form.amount,
      chatId: params?.id || "",
    });
  }

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data?.pages]);

  const promptChats = useMemo(() => {
    return (
      data?.pages.flatMap(({ prompts }) =>
        prompts.reverse().flatMap(({ wallpapers }) =>
          wallpapers.flatMap((wallpaper) => ({
            src: wallpaper.url ?? "",
            key: wallpaper.id ?? "",
          })),
        ),
      ) || []
    );
  }, [data?.pages]);

  return (
    <div className="relative flex h-full">
      <PhotoSlider
        images={promptChats}
        visible={isShowPreview}
        onClose={() => setShowPreview(false)}
        index={index}
        onIndexChange={setIndex}
      />

      {!!promptChats.length ? (
        <ScrollArea className="flex-1 border-r">
          {/* TODO: make better "view-all wallpapers in chat" feature */}
          {/* {!!promptChats.length && (
            <div className="absolute left-0 right-0 z-10 flex bg-slate-300 bg-opacity-85">
              {data?.pages.flatMap(({ prompts }) =>
                prompts.map(({ wallpapers }) => (
                  <div key={wallpapers[0]?.id}>
                    <Image
                      className="cursor-pointer brightness-75 filter"
                      src={wallpapers[0]?.url as string}
                      alt=""
                      width={120}
                      height={120}
                      onClick={() => {
                        setShowPreview(true);
                        setIndex(
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                          promptChats.findIndex(
                            (chat) => chat.src === wallpapers[0]!.url,
                          ),
                        );
                      }}
                    />
                  </div>
                )),
              )}
            </div>
          )} */}

          <div className="mx-auto max-w-screen-lg flex-col pl-4 pr-4 md:px-7">
            <div className="flex flex-1 flex-col-reverse border-none px-0 pt-10">
              <div ref={messagesEndRef} />

              {generateWallpaperAPI.status === "pending" && (
                <div className="flex justify-center p-4 pb-28 pt-12">
                  <SpinnerGenerateWallpaper />
                </div>
              )}
              {data?.pages.flatMap((prompt) =>
                prompt.prompts.map((promptChat, idx) => (
                  <div
                    key={`${promptChat.wallpapers[0]!.url}_${idx}`}
                    className="mb-7 flex flex-col gap-4 pb-5 sm:gap-4 md:gap-5"
                  >
                    {promptChat.wallpapers.length > 1 ? (
                      <div
                        style={{ scrollbarWidth: "thin" }}
                        className="scrollbar scrollbar-h-[6px] scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-thumb-gradient-to-r scrollbar-thumb-from-primary/60 scrollbar-thumb-to-primary/80 hover:scrollbar-thumb-from-primary/70 hover:scrollbar-thumb-to-primary/90 dark:scrollbar-thumb-from-primary/40 dark:scrollbar-thumb-to-primary/60 dark:hover:scrollbar-thumb-from-primary/50 dark:hover:scrollbar-thumb-to-primary/70 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-auto pb-4 transition-colors duration-200"
                      >
                        {promptChat.wallpapers.map((wallpaper) => (
                          <div
                            key={wallpaper.id}
                            className="relative flex !w-full flex-none snap-start items-center gap-4 overflow-hidden rounded-lg border border-border/30 shadow-sm transition-shadow duration-300 hover:shadow-md"
                          >
                            <Image
                              id={wallpaper.id}
                              width={500}
                              height={300}
                              style={{ width: "100%", height: "auto" }} // Responsive with aspect ratio maintained
                              className="cursor-pointer rounded-lg transition-all hover:scale-[1.02]"
                              src={wallpaper.url}
                              alt={`wallpaper-${promptChat.prompt_sent}`}
                              onClick={() => {
                                setShowPreview(true);
                                setIndex(
                                  promptChats.findIndex(
                                    (chat) => chat.src === wallpaper.url,
                                  ),
                                );
                              }}
                            />

                            {/* <div className="flex flex-col gap-0.5"> */}
                            {/* TODO: Create 'full-screen' button */}
                            {/* <Button
                            variant={"outline"}
                            size={"icon"}
                            onClick={async () => {
                              const imageEl = document.getElementById(
                                promptChat.wallpapers[0]!.id,
                              )!;
                              if (imageEl.requestFullscreen) {
                                await imageEl.requestFullscreen();
                              } else if (
                                (imageEl as any).mozRequestFullScreen
                              ) {
                                await (imageEl as any).mozRequestFullScreen();
                              } else if (
                                (imageEl as any).webkitRequestFullscreen
                              ) {
                                await (
                                  imageEl as any
                                ).webkitRequestFullscreen();
                              } else if ((imageEl as any).msRequestFullscreen) {
                                await (imageEl as any).msRequestFullscreen();
                              }
                              setOnFullScreen(true);
                            }}
                          >
                            <Expand />
                          </Button> */}
                            {/* <Button
                              variant={"outline"}
                              size={"icon"}
                              onClick={async () =>
                                downloadImage(promptChat.wallpapers[0]!.url)
                              }
                            >
                              <Download />
                            </Button>
                          </div> */}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <Image
                          id={promptChat.wallpapers[0]!.id}
                          width={500}
                          height={300}
                          style={{ width: "100%", height: "auto" }} // Responsive with aspect ratio maintained
                          className="cursor-pointer rounded-lg transition-all hover:scale-[1.02]"
                          src={promptChat.wallpapers[0]!.url}
                          alt={`wallpaper-${promptChat.prompt_sent}`}
                          onClick={() => {
                            setShowPreview(true);
                            setIndex(
                              promptChats.findIndex(
                                (chat) =>
                                  chat.src === promptChat.wallpapers[0]!.url,
                              ),
                            );
                          }}
                        />
                      </div>
                    )}

                    <div className="max-w-lg self-end rounded-lg bg-slate-200 px-3 py-2 leading-none">
                      {promptChat.prompt || promptChat.prompt_sent}
                    </div>
                  </div>
                )),
              )}
            </div>
          </div>
        </ScrollArea>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center border-r px-4">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <Image
                className="rounded-md opacity-75"
                src="/images/others/placeholder.jpg"
                alt=""
                width={300}
                height={100}
                priority
              />
              <div className="mt-2 max-w-lg text-center text-sm text-gray-500">
                Unlock your creative potential and experience the awesomeness of
                AI Wallpaper Gen right now!
              </div>
            </>
          )}
        </div>
      )}

      <div className="sticky top-0 hidden h-fit max-w-96 p-5 lg:block">
        <form onSubmit={(evt) => evt.preventDefault()}>
          <div className="rounded-lg bg-slate-100 p-4">
            <div className="mb-1 font-semibold">Prompt</div>
            <Textarea
              className="h-12 min-h-24 w-full bg-white pe-9"
              placeholder="Create a neon-lit cyberpunk cityscape at dusk"
              value={form.prompt}
              disabled={isDisabled}
              onChange={({ target }) =>
                setForm((prev) => ({ ...prev, prompt: target.value }))
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  generate();
                }
              }}
            />
          </div>

          <div className="mt-4 rounded-lg bg-slate-100 p-4">
            <div className="mb-1 font-semibold">Preset Styles</div>
            <ScrollArea>
              <div className="flex h-full min-h-28 flex-nowrap gap-6 overflow-hidden pb-4">
                <div className="relative">
                  {wallpaperType === undefined && (
                    <svg
                      className="icon z-2 absolute left-0 top-0 flex-none opacity-100"
                      width="65"
                      height="65"
                      viewBox="0 0 80 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_7175_24042)">
                        <path
                          d="M1 16C1 7.71573 7.71573 1 16 1H64C72.2843 1 79 7.71573 79 16V64C79 72.2843 72.2843 79 64 79H16C7.71573 79 1 72.2843 1 64V16Z"
                          stroke="url(#paint0_linear_7175_24042)"
                          strokeWidth="2"
                        ></path>
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_7175_24042"
                          x1="8.57143"
                          y1="40"
                          x2="68.4265"
                          y2="56.2848"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#DC4DFF"></stop>
                          <stop offset="0.968876" stopColor="#5A42FF"></stop>
                        </linearGradient>
                        <clipPath id="clip0_7175_24042">
                          <path
                            d="M0 16C0 7.16344 7.16344 0 16 0H64C72.8366 0 80 7.16344 80 16V64C80 72.8366 72.8366 80 64 80H16C7.16344 80 0 72.8366 0 64V16Z"
                            fill="white"
                          ></path>
                        </clipPath>
                      </defs>
                    </svg>
                  )}

                  <div
                    onClick={() => {
                      if (!isDisabled) return;
                      setWallpaperType(undefined);
                    }}
                    className={clsx(
                      "flex items-center justify-center",
                      "h-16 w-16 cursor-pointer overflow-hidden rounded-xl border-[3px] bg-gradient-to-r from-blue-500 to-purple-300 bg-clip-border text-center",
                      !isAuthenticated && "cursor-not-allowed grayscale",
                      isAuthenticated && "hover:border-transparent",
                    )}
                  >
                    <BanIcon size={50} opacity={0.3} />
                  </div>
                  <div className="mt-1 text-center text-xs">{"None"}</div>
                </div>

                {Object.values(WALLPAPERS_TYPE).map((value, idx) => (
                  <div className="relative" key={value}>
                    {wallpaperType === value && isAuthenticated && (
                      <svg
                        className="icon z-2 absolute left-0 top-0 flex-none opacity-100"
                        width="65"
                        height="65"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_7175_24042)">
                          <path
                            d="M1 16C1 7.71573 7.71573 1 16 1H64C72.2843 1 79 7.71573 79 16V64C79 72.2843 72.2843 79 64 79H16C7.71573 79 1 72.2843 1 64V16Z"
                            stroke="url(#paint0_linear_7175_24042)"
                            strokeWidth="2"
                          ></path>
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_7175_24042"
                            x1="8.57143"
                            y1="40"
                            x2="68.4265"
                            y2="56.2848"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#DC4DFF"></stop>
                            <stop offset="0.968876" stopColor="#5A42FF"></stop>
                          </linearGradient>
                          <clipPath id="clip0_7175_24042">
                            <path
                              d="M0 16C0 7.16344 7.16344 0 16 0H64C72.8366 0 80 7.16344 80 16V64C80 72.8366 72.8366 80 64 80H16C7.16344 80 0 72.8366 0 64V16Z"
                              fill="white"
                            ></path>
                          </clipPath>
                        </defs>
                      </svg>
                    )}

                    <div
                      onClick={() => {
                        if (!isAuthenticated) return;
                        setWallpaperType(
                          wallpaperType === value ? undefined : value,
                        );
                      }}
                      className={clsx(
                        "h-16 w-16 cursor-pointer overflow-hidden rounded-xl border-[3px] bg-gradient-to-r from-blue-500 to-purple-300 bg-clip-border text-center",
                        !isAuthenticated && "cursor-not-allowed grayscale",
                        isAuthenticated && "hover:border-transparent",
                      )}
                      key={value}
                    >
                      <Image
                        alt={value}
                        src={`/images/suggestions/${SUGGESTION_TYPE_URL[idx]}.png`}
                        width={100}
                        height={100}
                        className="mx-auto h-full w-full rounded-sm object-cover object-center text-center"
                      />
                    </div>
                    <div className="mt-1 text-center text-xs">{value}</div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <div className="mt-4 rounded-lg bg-slate-100 p-4">
            <div className="mb-2 font-semibold">Generate Amount</div>
            <div className={clsx("flex items-center gap-2")}>
              {[...Array(4)].map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (!isAuthenticated) return;
                    setForm((prev) => ({ ...prev, amount: idx + 1 }));
                  }}
                  className={clsx(
                    "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-2 bg-gray-200 text-center",
                    !isAuthenticated && "cursor-not-allowed grayscale",
                    isAuthenticated && "hover:border-purple-300",
                    form.amount === idx + 1 &&
                      "bg-gradient-to-r from-blue-500 to-purple-300 bg-clip-border",
                  )}
                >
                  {idx + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-slate-100 p-4">
            <Button
              className="w-full"
              onClick={generate}
              // className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Generate"
              disabled={isDisabled}
            >
              {isSubmitting ? (
                <Spinner className="text-white" />
              ) : !isAuthenticated ? (
                <span>Login to Generate</span>
              ) : (
                <>
                  <span>Generate</span>
                  <span className="ml-1 flex items-center gap-1 text-xs">
                    <Stars size={8} />
                    {`${session?.data?.user?.credits! > 1 ? session?.data?.user.credits || 0 + " credits" : session?.data?.user.credits || 0 + " credit"}`}
                  </span>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
