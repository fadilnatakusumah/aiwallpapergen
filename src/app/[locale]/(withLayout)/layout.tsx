import { Separator } from "@radix-ui/react-separator";

import { AppSidebar } from "~/components/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { SidebarInset, SidebarTrigger } from "~/components/ui/sidebar";
import UserCredits from "~/components/UserCredits";
import { Link } from "~/i18n/navigation";
import AllProviders from "../../_components/AllProviders";

import { auth } from "~/server/auth";

import LanguageDropdown from "~/components/LanguageDropdown";
import { getMyTranslation } from "~/i18n/translation-server";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const { t } = await getMyTranslation("common");

  return (
    <>
      <AllProviders withSidebar>
        <AppSidebar />
        <SidebarInset className="h-screen">
          <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-4">
            <SidebarTrigger id="sidebar-trigger" className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="sticky w-full">
              <BreadcrumbList className="flex justify-between">
                <BreadcrumbItem className="items-center md:flex">
                  <UserCredits />
                </BreadcrumbItem>
                <BreadcrumbItem className="self-end">
                  <LanguageDropdown />
                  {/* <Button>Login</Button> */}
                  {!session?.user && (
                    <Link href={"/auth"}>
                      <Button>{t("login")}</Button>
                    </Link>
                  )}
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          {children}
        </SidebarInset>
      </AllProviders>
    </>
  );
}
