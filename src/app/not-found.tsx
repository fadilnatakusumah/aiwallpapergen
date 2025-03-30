// "use client";

import "~/styles/globals.css";

import { Home } from "lucide-react";
import { type Metadata } from "next";

import LanguageDropdown from "~/components/LanguageDropdown";
import MotionWrapper from "~/components/MotionWrapper";
import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/navigation";
import { getMyTranslation } from "~/i18n/translation-server";

// app/layout.tsx
export const metadata: Metadata = {
  title: "AI Wallpaper Generator | Create Stunning AI-Generated Wallpapers",
  description:
    "Discover the ultimate AI-powered wallpaper generator. Create, customize, and share unique wallpapers generated with cutting-edge AI technology. Perfect for desktop and mobile backgrounds.",
  keywords: [
    "AI wallpaper",
    "wallpaper generator",
    "DALL-E",
    "AI art",
    "digital art",
    "creative wallpapers",
    "AI design",
  ],
  openGraph: {
    title: "AI Wallpaper Generator",
    description:
      "Unleash your creativity with our AI-powered wallpaper generator. Make unique, stunning wallpapers perfect for every device.",
    url: "https://aiwallpapergen.com",
    siteName: "AI Wallpaper Generator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Wallpaper Generator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dilnatakusumah", // Replace with your Twitter handle if available
    title: "AI Wallpaper Generator",
    description:
      "Create, customize, and share stunning AI-generated wallpapers. Perfect for every device!",
    images: ["/og-image.jpg"],
  },
};

export default async function NotFound() {
  // Ensure that the incoming `locale` is valid
  // console.log("🚀 ~ params:", params);
  // console.log("🚀 ~ locale:", locale);
  // const locale = (await getLocale()) ?? localeParams;
  // console.log("🚀 ~ params:", await params);

  // const [isRepairing, setIsRepairing] = useState(false);
  // const [repairProgress, setRepairProgress] = useState(0);

  // // Simulate the repair process when the button is clicked
  // useEffect(() => {
  //   if (isRepairing) {
  //     const interval = setInterval(() => {
  //       setRepairProgress((prev) => {
  //         const newProgress = prev + 1;
  //         if (newProgress >= 100) {
  //           setIsRepairing(false);
  //           clearInterval(interval);
  //           return 100;
  //         }
  //         return newProgress;
  //       });
  //     }, 30);

  //     return () => clearInterval(interval);
  //   }
  // }, [isRepairing]);

  // Generate glitch positions for the animation
  // const glitchPositions = Array.from({ length: 15 }, () => ({
  //   x: Math.random() * 100,
  //   y: Math.random() * 100,
  //   width: 5 + Math.random() * 20,
  //   height: 5 + Math.random() * 20,
  // }));

  const { t } = await getMyTranslation("not-found");

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="w-full max-w-3xl text-center">
          {/* Animated 404 text */}
          <MotionWrapper
            tag="h1"
            className="mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-8xl font-bold text-transparent md:text-9xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            {t("404")}
          </MotionWrapper>

          {/* Subtitle */}
          <MotionWrapper
            tag="h2"
            className="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("heading")}
            {/* The page you`re looking is not available */}
          </MotionWrapper>

          {/* Corrupted wallpaper visualization */}
          <MotionWrapper
            initial={false}
            className="relative mx-auto mb-8 hidden aspect-[16/9] w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-lg"
            // initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Base wallpaper image */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100" /> */}

            {/* Glitch elements that disappear during repair */}
            {/* {glitchPositions.map((pos, index) => (
                <MotionWrapper
                  key={index}
                  className="absolute bg-gray-900/80"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    width: `${pos.width}%`,
                    height: `${pos.height}%`,
                  }}
                  initial={{ opacity: 1 }}
                  // animate={{
                  //   opacity: isRepairing ? 0 : 1,
                  //   x: isRepairing ? [0, Math.random() * 10 - 5, 0] : 0,
                  // }}
                  transition={{
                    opacity: { delay: index * 0.02, duration: 0.5 },
                    x: { repeat: Number.POSITIVE_INFINITY, duration: 0.2 },
                  }}
                />
              ))} */}

            {/* AI repair visualization */}
            {/* {isRepairing && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )} */}

            {/* Scanning line during repair */}
            {/* {isRepairing && (
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              )} */}

            {/* Centered error icon or success icon */}
            {/* <div className="absolute inset-0 flex items-center justify-center">
                <MotionWrapper
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </MotionWrapper>
              </div> */}

            {/* Progress bar */}
            {/* {isRepairing && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <motion.div
                      className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${repairProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <div className="mt-1 text-center text-xs font-medium text-gray-700">
                    Repairing: {repairProgress}%
                  </div>
                </div>
              )} */}
          </MotionWrapper>

          {/* Message */}
          <MotionWrapper
            tag="p"
            className="mx-auto mb-8 max-w-md text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {t("description")}
            {/*    */}
          </MotionWrapper>

          {/* Action buttons */}
          <MotionWrapper
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <LanguageDropdown />
            <Link href="/">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Home className="mr-2 h-4 w-4" />
                {t("return-home")}
              </Button>
            </Link>
          </MotionWrapper>
        </div>
      </div>
    </>
  );
}
