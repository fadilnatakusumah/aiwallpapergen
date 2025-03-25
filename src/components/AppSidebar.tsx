"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import * as React from "react";

import { NavMain } from "~/components/nav-main";
import { NavUser } from "~/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "~/components/ui/sidebar";
import { WallpaperChats } from "~/components/WallpaperChats";
import { Link } from "~/i18n/navigation";

import { getCurrentVersion } from "~/helpers/version";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession();
  const ctx = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href={"/"} className="flex items-center px-2">
          <Image
            className="inline-block"
            alt="aiwallpapergen.com"
            height={24}
            width={24}
            src="/og-image.png"
          />
          <div className="bold inline-block overflow-hidden text-ellipsis whitespace-nowrap px-2 text-lg">
            AI{" "}
            {ctx.state === "expanded" && (
              <span>
                <strong className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text font-bold text-transparent">
                  Wallpaper
                </strong>{" "}
                Gen
              </span>
            )}
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <WallpaperChats />
      </SidebarContent>
      {session?.data && (
        <>
          <div className="px-4 py-1 text-right text-slate-400 md:text-sm">
            v{getCurrentVersion()}
          </div>
          <SidebarFooter>
            <NavUser
              user={{
                name: session?.data?.user.name ?? "",
                email: session?.data?.user.email ?? "",
                avatar: session?.data?.user.image ?? "",
              }}
            />
          </SidebarFooter>
        </>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
