import { GeistSans } from "geist/font/sans";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";

import ProgressBarProvider from "~/components/ProgressBar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { Toaster } from "~/components/ui/sonner";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import "~/styles/globals.css";

export default async function AllProviders({
  children,
  withSidebar,
}: Readonly<{ children: React.ReactNode; withSidebar?: boolean }>) {
  return (
    <>
      <TRPCReactProvider>
        <SessionProvider>
          <ProgressBarProvider>
            {withSidebar ? (
              <SidebarProvider>{children}</SidebarProvider>
            ) : (
              children
            )}
          </ProgressBarProvider>
        </SessionProvider>
      </TRPCReactProvider>
      <Toaster />
    </>
  );
}
