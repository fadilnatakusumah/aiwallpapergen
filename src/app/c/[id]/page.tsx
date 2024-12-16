"use client";
import clsx from "clsx";
import { Expand, Send } from "lucide-react";
import { type NextPageContext, type NextPage } from "next";
import Image from "next/image";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Spinner } from "~/components/ui/spinner";
import { type WALLPAPERS_TYPE } from "~/data/prompt";
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

export default function Chat({ params }: { params: Promise<{ id: string }> }) {
  const useParams = use(params);
  console.log("🚀 ~ Chat ~ useParams:", useParams);
  const { data, refetch } = useInfinitePrompt({ id: useParams?.id });
  console.log("🚀 ~ data:", data);
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
  // console.log("🚀 ~ Chat ~ errorMessage:", errorMessage);

  const generateWallpaperAPI = api.wallpaper.generateWallpaper.useMutation({
    onSuccess(data) {
      refetch().catch(console.error);
      // setData(data);
    },
    onError(error) {
      setErrorMessage(error.message as string);
    },
    onSettled() {
      setLoading(false);
      setForm({ prompt: "" });
    },
  });

  function generate() {
    setLoading(true);
    setErrorMessage("");
    console.log("🚀 ~ generate ~ form:", form);
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
    <>
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
        {/* <div className="relative">
        <div className="absolute left-0 right-0 z-10 flex bg-slate-300 bg-opacity-85">
          {
            data?.pages.flatMap(({ prompts }) =>
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
            )

            // .map((item, index) => (
            //   <PhotoView key={index} src={item}>
            //     <img src={item} alt="" />
            //   </PhotoView>
            // ))
          }
        </div>
      </div> */}
        <div className="h-full border-r p-5">
          <PopoverColorPicker color={color} onChange={setColor} />
          {/* <HexColorPicker color={color} onChange={setColor} /> */}
        </div>
        {/* <Separator orientation="vertical" /> */}
        <ScrollArea className="flex-1">
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

        <div className="p5 border-l p-5">
          <h1>Trending</h1>
          <h1>Most Favorite</h1>
        </div>
      </div>

      <div className="sticky bottom-0 z-10 border border-x-0 bg-white px-4 py-6 md:px-20">
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
        <div className="relative">
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
        </div>
      </div>
    </>
  );
}
