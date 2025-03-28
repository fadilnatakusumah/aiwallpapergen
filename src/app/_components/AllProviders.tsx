import { SessionProvider } from "next-auth/react";

import ProgressBarProvider from "~/components/ProgressBar";
import { SidebarProvider } from "~/components/ui/sidebar";
import { Toaster } from "~/components/ui/sonner";

import { TRPCReactProvider } from "~/trpc/react";

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
