import { type Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
  title: "Create Wallpaper | AI Wallpaper Gen",
};

async function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export default RootLayout;
