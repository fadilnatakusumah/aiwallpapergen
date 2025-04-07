import { Home } from "lucide-react";
import { type Metadata } from "next";

import LanguageDropdown from "~/components/LanguageDropdown";
import MotionWrapper from "~/components/MotionWrapper";
import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/navigation";
import { getMyTranslation } from "~/i18n/translation-server";

// app/layout.tsx
export const metadata: Metadata = {
  title: "Terms of Service | AI Wallpaper Gen",
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

export default async function TermsOfService() {
  const { t } = await getMyTranslation("terms-of-service");

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="w-full max-w-3xl pt-5 text-center">
          {/* Animated 404 text */}
          <MotionWrapper
            tag="h1"
            className="mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent md:text-7xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            {t("title")}
          </MotionWrapper>

          <MotionWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <LanguageDropdown />
          </MotionWrapper>

          <MotionWrapper
            tag="h2"
            className="mb-6 mt-6 text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div
              className="text-left"
              dangerouslySetInnerHTML={{ __html: t("content") }}
            />
          </MotionWrapper>

          {/* Action buttons */}
          <MotionWrapper
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/">
              <Button
                size="lg"
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
