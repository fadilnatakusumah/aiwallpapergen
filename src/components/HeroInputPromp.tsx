// Dependencies: pnpm install lucide-react
"use client";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { Send } from "lucide-react";
import { useState } from "react";
import { WALLPAPERS_TYPE } from "~/data/prompt";
import { api } from "~/trpc/react";
import { Alert } from "./Alert";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Spinner } from "./ui/spinner";
import { type GenerateWallpaper } from "~/server/api/routers/wallpaper";
import Image from "next/image";

const SuggestionsUrls = [
  "futuristic",
  "galactic",
  "minimalist",
  "mystical",
  "tropical",
  "vintage",
];
export default function HeroInputPrompt({
  placeholder,
}: Pick<HTMLInputElement, "className" | "placeholder">) {
  const [form, setForm] = useState({
    prompt: "",
  });
  const [data, setData] = useState<GenerateWallpaper>();
  const [wallpaperType, setWallpaperType] = useState<WALLPAPERS_TYPE>();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const generateWallpaperAPI = api.wallpaper.generateWallpaper.useMutation({
    onSuccess(data) {
      setData(data);
    },
    onError(error) {
      setErrorMessage(error.message);
    },
    onSettled() {
      setLoading(false);
    },
  });

  async function generate() {
    setLoading(true);
    setErrorMessage("");
    generateWallpaperAPI.mutate({
      prompt: form.prompt,
      type: wallpaperType!,
    });
  }

  return (
    <div className="w-full space-y-2">
      <div className="relative mb-6">
        <Input
          id="input-19"
          className="w-full pe-9"
          placeholder={placeholder}
          type="email"
          disabled={isLoading}
          onChange={({ target }) => setForm({ prompt: target.value })}
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

      {errorMessage && <Alert message={errorMessage} variant={"destructive"} />}

      <Label className="block">Select a preset type</Label>

      <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
        {Object.values(WALLPAPERS_TYPE).map((value, idx) => (
          <div
            onClick={() =>
              setWallpaperType(wallpaperType === value ? undefined : value)
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

      {/* {data?.data?.url_wallpaper && (
        <div>
          <Image
            alt="result-of-ai"
            src={data.data.url_wallpaper}
            width={1024}
            height={720}
          />
        </div>
      )} */}
    </div>
  );
}
