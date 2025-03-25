import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import Script from "next/script";

import { getLocale } from "next-intl/server";
import { env } from "~/env";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${GeistSans.variable}`}>
      <head>
        {/* Load gtag.js after the page is interactive */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
        </Script>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
