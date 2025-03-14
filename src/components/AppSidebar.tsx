"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession();
  const ctx = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href={"/"}>
          <div className="bold overflow-hidden text-ellipsis whitespace-nowrap px-2 text-lg">
            AI{" "}
            {ctx.state === "expanded" && (
              <span>
                <strong>Wallpaper</strong> Gen
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
        <SidebarFooter>
          <NavUser
            user={{
              name: session?.data?.user.name ?? "",
              email: session?.data?.user.email ?? "",
              avatar: session?.data?.user.image ?? "",
            }}
          />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
