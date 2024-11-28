/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { WALLPAPERS_TYPE } from "~/data/prompt";
import { api } from "~/trpc/react";

function GenerateForm() {
  const [form, setForm] = useState({
    prompt: "",
  });
  const [data, setData] = useState<any>();
  const [wallpaperType, setWallpaperType] = useState<WALLPAPERS_TYPE>();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  const generateWallpaperAPI = api.wallpaper.generateWallpaper.useMutation({
    // throwOnError: (error) => {
    //   console.log("🚀 ~ GenerateForm ~ error:", error);
    //   setErrorMessage(error.message);
    //   return {

    //   }
    // },
    onSuccess(data) {
      setData(data);
    },
    onError(error) {
      console.log("🚀 ~ onError ~ error:", error);
      setErrorMessage(error.message);
    },
    // throwOnError(error) {
    //   console.log("🚀 ~ throwOnError ~ error:", error);
    //   return true;
    // },
    onSettled() {
      setLoading(false);
      // setForm({ color: "", prompt: "" });
    },
  });

  const generate = async () => {
    try {
      setLoading(true);
      setErrorMessage("");
      console.log("🚀 ~ generate ~ wallpaperType:", wallpaperType);
      console.log("🚀 ~ generate ~ form.prompt:", form.prompt);
      generateWallpaperAPI.mutate({
        prompt: form.prompt,
        type: wallpaperType!,
      });
    } catch (error) {
      console.log("🚀 ~ generate ~ error:", error);
    }
  };
  return (
    <div>
      <div>
        <ul>
          {Object.values(WALLPAPERS_TYPE).map((value) => (
            <li key={value}>
              <label>{value}</label>
              <input
                type="radio"
                checked={wallpaperType === value}
                value={value}
                onChange={(evt) =>
                  setWallpaperType(evt.target.value as WALLPAPERS_TYPE)
                }
              />
            </li>
          ))}
        </ul>
        {wallpaperType && (
          <button onClick={() => setWallpaperType(undefined)}>
            Clear type
          </button>
        )}
      </div>
      <textarea
        className="border"
        value={form.prompt}
        onChange={({ target }) => setForm({ prompt: target.value })}
      />
      <button
        disabled={isLoading}
        className="block border border-gray-700 bg-slate-200 p-3"
        onClick={generate}
      >
        {isLoading ? "Loading" : "Submit"}
      </button>
      <div className="max-w-xl">
        {errorMessage && <pre>{JSON.stringify({ errorMessage }, null, 2)}</pre>}
        {data?.data?.url && (
          <div>
            <Image
              alt="result-of-ai"
              src={data.data.url}
              width={1024}
              height={720}
            />
          </div>
        )}
        <pre>{JSON.stringify({ data }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default GenerateForm;
