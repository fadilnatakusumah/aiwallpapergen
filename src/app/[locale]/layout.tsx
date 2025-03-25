import "~/styles/globals.css";

import { type Metadata } from "next";
import { hasLocale } from "next-intl";

import { notFound } from "next/navigation";
import { routing } from "~/i18n/routing";

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
        url: "https://aiwallpapergen.com/og-image.jpg",
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
    images: ["https://aiwallpapergen.com/og-image.jpg"],
  },
};

async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "id" }>;
}>) {
  // // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <>{children}</>;
}

export default RootLayout;
