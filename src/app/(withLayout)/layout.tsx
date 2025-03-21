import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

import { AppSidebar } from "~/components/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { SidebarInset, SidebarTrigger } from "~/components/ui/sidebar";
import UserCredits from "~/components/UserCredits";
import AllProviders from "../_components/AllProviders";

import { auth } from "~/server/auth";

import "~/styles/globals.css";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <>
      <AllProviders withSidebar>
        <AppSidebar />
        <SidebarInset className="h-screen">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="sticky w-full">
              <BreadcrumbList className="flex justify-between">
                <BreadcrumbItem className="items-center md:flex">
                  <UserCredits />
                </BreadcrumbItem>
                {!session?.user && (
                  <BreadcrumbItem className="self-end">
                    <Link href={"/auth"}>
                      <Button>Login</Button>
                    </Link>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          {children}
        </SidebarInset>
      </AllProviders>
    </>
  );
}
