"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function InfiniteCarousel() {
  const [activeDirection, setActiveDirection] = useState<"ltr" | "rtl">("ltr");

  // Toggle direction every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDirection((prev) => (prev === "ltr" ? "rtl" : "ltr"));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const wallpapersRightToLeft = [
    { id: 1, src: "/images/suggestions/futuristic.png", alt: "Wallpaper 1" },
    { id: 2, src: "/images/suggestions/galactic.png", alt: "Wallpaper 2" },
    { id: 3, src: "/images/suggestions/minimalist.png", alt: "Wallpaper 3" },
    { id: 4, src: "/images/suggestions/mystical.png", alt: "Wallpaper 4" },
    { id: 5, src: "/images/suggestions/tropical.png", alt: "Wallpaper 5" },
    { id: 6, src: "/images/suggestions/vintage.png", alt: "Wallpaper 6" },
  ];
  const wallpapersLeftToRight = [
    { id: 1, src: "/images/carousel/1.png", alt: "Wallpaper 1" },
    { id: 2, src: "/images/carousel/2.png", alt: "Wallpaper 2" },
    { id: 3, src: "/images/carousel/3.png", alt: "Wallpaper 3" },
    { id: 4, src: "/images/carousel/4.png", alt: "Wallpaper 4" },
    { id: 5, src: "/images/carousel/5.png", alt: "Wallpaper 5" },
    { id: 6, src: "/images/carousel/6.png", alt: "Wallpaper 6" },
  ];

  // Duplicate the items to create the infinite loop effect
  const duplicatedWallpapersRTL = [
    ...wallpapersRightToLeft,
    ...wallpapersRightToLeft,
  ];
  const duplicatedWallpapersLTR = [
    ...wallpapersLeftToRight,
    ...wallpapersLeftToRight,
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left to Right Carousel */}
      <div
        className={`relative w-full overflow-hidden py-4 ${activeDirection === "ltr" ? "opacity-100" : "opacity-40"} transition-opacity duration-1000`}
      >
        <div className="flex animate-carousel-ltr">
          {duplicatedWallpapersRTL.map((wallpaper, index) => (
            <div
              key={`ltr-${wallpaper.id}-${index}`}
              className="w-[300px] flex-shrink-0 px-2"
            >
              <Image
                height={200}
                width={160}
                src={wallpaper.src || "/placeholder.svg"}
                alt={wallpaper.alt}
                className="h-[200px] w-full rounded-lg object-cover shadow-md transition-all duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right to Left Carousel */}
      <div
        className={`relative w-full overflow-hidden py-4 ${activeDirection === "rtl" ? "opacity-100" : "opacity-40"} transition-opacity duration-1000`}
      >
        <div className="flex animate-carousel-rtl">
          {duplicatedWallpapersLTR.map((wallpaper, index) => (
            <div
              key={`rtl-${wallpaper.id}-${index}`}
              className="w-[300px] flex-shrink-0 px-2"
            >
              <Image
                height={200}
                width={160}
                src={wallpaper.src || "/placeholder.svg"}
                alt={wallpaper.alt}
                className="h-[200px] w-full rounded-lg object-cover shadow-md transition-all duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* <div className="flex justify-center gap-4 py-4">
        <button
          onClick={() => setActiveDirection("ltr")}
          className={`rounded-md px-4 py-2 ${activeDirection === "ltr" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          Left to Right
        </button>
        <button
          onClick={() => setActiveDirection("rtl")}
          className={`rounded-md px-4 py-2 ${activeDirection === "rtl" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          Right to Left
        </button>
      </div> */}
    </div>
  );
}
