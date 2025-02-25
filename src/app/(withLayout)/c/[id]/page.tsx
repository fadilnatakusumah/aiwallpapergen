"use client";
import clsx from "clsx";
import { Expand, Send, Star, StarIcon, StarOff, Stars } from "lucide-react";
import { type NextPageContext, type NextPage } from "next";
import Image from "next/image";
import React, {
  FormEvent,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Spinner } from "~/components/ui/spinner";
import { WALLPAPERS_TYPE } from "~/data/prompt";
import { useInfinitePrompt } from "~/hooks/prompt";
import { api } from "~/trpc/react";
import { format, formatRelative, subDays } from "date-fns";
import { formatDate } from "~/helpers/date";
import { type Prompt } from "@prisma/client";

import { PhotoProvider, PhotoSlider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Button } from "~/components/ui/button";
import { HexColorPicker } from "react-colorful";
import { PopoverColorPicker } from "~/components/PopoverColorPicker";
import { Textarea } from "~/components/ui/textarea";

const SuggestionsUrls = [
  "futuristic",
  "galactic",
  "minimalist",
  "mystical",
  "tropical",
  "vintage",
];

export default function Chat({ params }: { params: Promise<{ id: string }> }) {
  const useParams = use(params);
  const { data, error, refetch } = useInfinitePrompt({ id: useParams?.id });
  console.log("🚀 ~ Chat ~ error:", error);
  const [color, setColor] = useState("#aabbcc");
  const [form, setForm] = useState({
    prompt: "",
  });
  // const [data, setData] = useState<GenerateWallpaper>();
  const [wallpaperType, setWallpaperType] = useState<WALLPAPERS_TYPE>();
  const [isLoading, setLoading] = useState(false);
  const [isShowPreview, setShowPreview] = useState(false);

  const [index, setIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>();
  const generateWallpaperAPI = api.wallpaper.generateWallpaper.useMutation({
    onSuccess(data) {
      // console.log("🚀 ~ onSuccess ~ data:", data);
      refetch().catch(console.error);
      // setData(data);
    },
    onError(error) {
      console.log("🚀 ~ onError ~ error:", error);
      setErrorMessage(error.message as string);
    },
    onSettled() {
      setLoading(false);
      setForm({ prompt: "" });
    },
  });

  function generate() {
    // evt: FormEvent
    // evt.preventDefault();

    console.log("Generate form ");

    setLoading(true);
    setErrorMessage("");
    generateWallpaperAPI.mutate({
      prompt: form.prompt,
      type: wallpaperType!,
      chatId: useParams?.id,
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
        prompts.map(({ wallpapers }) => ({
          src: wallpapers[0]?.url ?? "",
          key: wallpapers[0]?.user_id ?? "",
        })),
      ) || []
    );
  }, [data?.pages]);

  return (
    <main>
      <div
        className="flex h-full overflow-y-hidden"
        //  className="flex h-full"
      >
        <PhotoSlider
          images={promptChats}
          visible={isShowPreview}
          onClose={() => setShowPreview(false)}
          index={index}
          onIndexChange={setIndex}
        />

        {/* <div className="h-full border-r p-5">
          <PopoverColorPicker color={color} onChange={setColor} />
        </div> */}
        {/* <Separator orientation="vertical" /> */}
        <ScrollArea className="relative flex-1">
          <div className="mx-auto max-w-screen-lg flex-col pl-4 pr-4 md:px-7">
            <div className="flex flex-1 flex-col-reverse border-none px-0 pt-10">
              <div ref={messagesEndRef} />
              {data?.pages.flatMap((prompt) =>
                prompt.prompts.map(
                  (promptChat: Prompt & { wallpapers: { url: string }[] }) => (
                    <div
                      key={promptChat.id}
                      className="mb-7 flex flex-col gap-4 pb-5 sm:gap-4 md:gap-5"
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          id={promptChat.chat_id}
                          className="cursor-pointer rounded-lg transition-all hover:scale-105"
                          width={500}
                          height={300}
                          src={promptChat.wallpapers[0]!.url}
                          alt={`wallpaper-${promptChat.prompt_sent}`}
                          onClick={() => {
                            setShowPreview(true);
                            setIndex(
                              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                              promptChats.findIndex(
                                (chat) =>
                                  chat.src === promptChat.wallpapers[0]!.url,
                              ),
                            );
                          }}
                        />
                        {/* <Button
                        variant={"outline"}
                        size={"icon"}
                        onClick={async () => {
                          const imageEl = document.getElementById(
                            promptChat.chat_id,
                          )!;
                          if (imageEl.requestFullscreen) {
                            await imageEl.requestFullscreen();
                          } else if (imageEl.webkitRequestFullscreen) {
                            await imageEl.webkitRequestFullscreen?.();
                          } else if (imageEl.msRequestFullscreen) {
                            await imageEl.msRequestFullscreen();
                          }
                        }}
                      >
                        <Expand />
                      </Button> */}
                      </div>
                      <div className="max-w-lg self-end rounded-lg bg-slate-200 px-3 py-2 leading-none">
                        {promptChat.prompt || promptChat.prompt_sent}
                      </div>
                      {/* <div>{format(promptChat.created_at, "mm-dd-yyyy")}</div> */}
                    </div>
                  ),
                ),
              )}
            </div>
          </div>
        </ScrollArea>

        <form
          className="max-w-96 border-l p-5"
          onSubmit={(prev) => prev.preventDefault()}
        >
          <div className="rounded-lg bg-slate-100 p-4">
            <div className="mb-1 font-semibold">Prompt</div>
            <Textarea
              // id="input-19"
              className="h-12 min-h-24 w-full bg-white pe-9"
              placeholder="Create a neon-lit cyberpunk cityscape at dusk"
              value={form.prompt}
              disabled={isLoading}
              onChange={({ target }) => setForm({ prompt: target.value })}
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
              <div className="flex h-full min-h-28 flex-nowrap gap-6 overflow-y-hidden pb-4">
                {Object.values(WALLPAPERS_TYPE).map((value, idx) => (
                  <div className="relative" key={value}>
                    {wallpaperType === value && (
                      <svg
                        className="icon z-2 absolute left-0 top-0 flex-none opacity-100"
                        width="65"
                        height="65"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_7175_24042)">
                          <path
                            d="M1 16C1 7.71573 7.71573 1 16 1H64C72.2843 1 79 7.71573 79 16V64C79 72.2843 72.2843 79 64 79H16C7.71573 79 1 72.2843 1 64V16Z"
                            stroke="url(#paint0_linear_7175_24042)"
                            stroke-width="2"
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
                            <stop stop-color="#DC4DFF"></stop>
                            <stop offset="0.968876" stop-color="#5A42FF"></stop>
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
                      onClick={() =>
                        setWallpaperType(
                          wallpaperType === value ? undefined : value,
                        )
                      }
                      className={clsx(
                        "h-16 w-16 cursor-pointer overflow-hidden rounded-xl border-[3px] bg-gradient-to-r from-blue-500 to-purple-300 bg-clip-border text-center hover:border-transparent",
                        // "h-28 w-full cursor-pointer overflow-hidden rounded-lg border-4 border-transparent object-contain",
                        // wallpaperType === value
                        //   ? "border-transparent bg-gradient-to-r from-blue-500 to-purple-300 bg-clip-border"
                        //   : "border-transparent",
                      )}
                      key={value}
                    >
                      <Image
                        alt={value}
                        src={`/images/suggestions/${SuggestionsUrls[idx]}.png`}
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
            <Button className="w-full" onClick={generate}>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  <span>Generate</span>
                  <span className="ml-1 flex items-center gap-1 text-xs">
                    <Stars size={8} />1 Credits
                  </span>
                </>
              )}
              {/* {}
              <span>Generate</span>
              <span className="ml-1 flex items-center gap-1 text-xs">
                <Stars size={8} />1 Credits
              </span> */}
            </Button>
            {/* <button
              onClick={generate}
              className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Subscribe"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <Send size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </button> */}
          </div>
        </form>
      </div>

      {/* <div className="sticky bottom-0 z-10 border border-x-0 bg-white px-4 py-6 md:px-20"> */}
      {/* <div>
            <Label className="block">Select a preset type</Label>
            <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
              {Object.values(WALLPAPERS_TYPE).map((value, idx) => (
                <div
                  onClick={() =>
                    setWallpaperType(
                      wallpaperType === value ? undefined : value,
                    )
                  }
                  className={clsx(
                    "h-20 w-full cursor-pointer overflow-hidden rounded-lg border-4 border-transparent object-contain",
                    wallpaperType === value && "border-4 border-blue-300",
                  )}
                  key={value}
                >
                  <Image
                    alt={value}
                    src={`/images/suggestions/${SuggestionsUrls[idx]}.png`}
                    width={800}
                    height={400}
                    className="object-contain"
                  />
                  <div>{value}</div>
                </div>
              ))}
            </div>
          </div> */}
      {/* <div className="relative">
          <Input
            // id="input-19"
            className="h-12 w-full pe-9"
            placeholder="Type your prompt here"
            value={form.prompt}
            type="text"
            disabled={isLoading}
            onChange={({ target }) => setForm({ prompt: target.value })}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                generate();
              }
            }}
          />
          <button
            onClick={generate}
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Subscribe"
            disabled={isLoading}
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <Send size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div> */}
      {/* </div> */}
    </main>
  );
}
