import { GeistSans } from "geist/font/sans";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

import ProgressBarProvider from "~/components/ProgressBar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { Toaster } from "~/components/ui/sonner";

import { TRPCReactProvider } from "~/trpc/react";

import "~/styles/globals.css";

export default async function AllProviders({
  children,
  withSidebar,
}: Readonly<{ children: React.ReactNode; withSidebar?: boolean }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
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
      </body>
    </html>
  );
}
