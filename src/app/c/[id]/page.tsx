"use client";
import clsx from "clsx";
import { Send } from "lucide-react";
import { type NextPageContext, type NextPage } from "next";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { Spinner } from "~/components/ui/spinner";
import { type WALLPAPERS_TYPE } from "~/data/prompt";
import { useInfinitePrompt } from "~/hooks/prompt";
import { api } from "~/trpc/react";

export default function Chat({ params }: { params: Promise<{ id: string }> }) {
  const useParams = use(params);
  console.log("🚀 ~ Chat ~ useParams:", useParams);
  const { data, refetch } = useInfinitePrompt({ id: useParams?.id });
  console.log("🚀 ~ data:", data);

  const [form, setForm] = useState({
    prompt: "",
  });
  // const [data, setData] = useState<GenerateWallpaper>();
  const [wallpaperType, setWallpaperType] = useState<WALLPAPERS_TYPE>();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  console.log("🚀 ~ Chat ~ errorMessage:", errorMessage);

  const generateWallpaperAPI = api.wallpaper.generateWallpaper.useMutation({
    onSuccess(data) {
      refetch().catch(console.error);
      // setData(data);
    },
    onError(error) {
      setErrorMessage(error.message);
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

  return (
    <ScrollArea className="w-full">
      <div className="mx-auto h-screen max-w-screen-lg flex-1 flex-col pr-7">
        <div className="flex h-full flex-1 flex-col-reverse border-none px-0 pt-10">
          <div ref={messagesEndRef} />
          {data?.pages.flatMap((prompt) =>
            prompt.prompts.map((promptChat) => (
              <div
                key={promptChat.id}
                className="mb-6 flex flex-col gap-4 sm:gap-6 md:gap-8"
              >
                {/* <pre>{JSON.stringify(promptChat, null, 2)}</pre> */}
                <div className="">
                  <Image
                    className="rounded-lg"
                    width={500}
                    height={300}
                    src={promptChat.wallpapers[0]!.url}
                    alt={`wallpaper-${promptChat.prompt_sent}`}
                  />
                </div>
                <div className="max-w-lg self-end rounded-lg bg-slate-200 px-2.5 py-2">
                  {promptChat.prompt || promptChat.prompt_sent}
                </div>
              </div>
            )),
          )}
        </div>
        <div className="sticky bottom-0 z-10 bg-white px-1 py-6">
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
      </div>
    </ScrollArea>
  );
}
