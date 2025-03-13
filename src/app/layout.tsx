import "~/styles/globals.css";

import { type Metadata } from "next";

import AllProviders from "./_components/AllProviders";

export const metadata: Metadata = {
  title: "AI Wallpaper Gen",
  description: "Generate your own wallpaper using advanced AI technology",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AllProviders withSidebar>{children}</AllProviders>;
}
