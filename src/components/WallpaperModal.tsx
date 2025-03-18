"use client";

import { Prompt, User, Wallpaper } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Heart, Share2, X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

import { Button } from "./ui/button";
import { downloadImage } from "~/helpers/file";

interface WallpaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallpaper: Wallpaper & { prompt: Prompt; user: User };
}

export function WallpaperModal({
  isOpen,
  onClose,
  wallpaper,
}: WallpaperModalProps) {
  // Close modal on escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-auto rounded-2xl bg-white shadow-[0_20px_60px_rgba(120,_58,_180,_0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 rounded-full bg-white/70 text-slate-800 shadow-md hover:bg-white/90"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>

            <div className="grid md:grid-cols-[2fr_1fr]">
              <div className="relative h-full w-full">
                <Image
                  src={wallpaper.url || "/placeholder.svg"}
                  alt={wallpaper.prompt.prompt}
                  fill
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="flex flex-col p-8">
                <h2 className="mb-2 text-2xl font-bold">
                  {wallpaper.prompt.prompt}
                </h2>
                <p className="mb-6 text-sm text-slate-600">
                  by{" "}
                  <span className="font-medium text-purple-600">
                    {wallpaper.user.username}
                  </span>
                </p>

                <div className="mb-6 rounded-xl bg-gradient-to-br from-slate-50 to-purple-50 p-5 shadow-sm">
                  <h3 className="mb-2 text-sm font-medium text-slate-700">
                    Prompt
                  </h3>
                  <p className="text-sm text-slate-600">
                    {wallpaper.prompt.prompt}
                  </p>
                </div>

                <div
                  style={{ scrollbarWidth: "thin" }}
                  className="mb-6 max-h-28 overflow-y-auto rounded-xl bg-gradient-to-br from-slate-50 to-purple-50 p-5 shadow-sm"
                >
                  <h3 className="mb-2 text-sm font-medium text-slate-700">
                    Refined Prompt
                  </h3>
                  <p className="text-sm text-slate-600">
                    {wallpaper.prompt.refined_prompt}
                  </p>
                </div>

                <div className="mb-6 flex items-center gap-4">
                  {/* <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full"
                  >
                    <Heart className="h-4 w-4" />
                    <span>{wallpaper.likes}</span>
                  </Button> */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full"
                    onClick={() => downloadImage(wallpaper.url)}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                  {/* <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button> */}
                </div>

                <div className="mt-auto">
                  <h3 className="mb-2 text-sm font-medium text-slate-700">
                    Resolution
                  </h3>
                  <p className="text-sm text-slate-600">1792 x 1024</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
