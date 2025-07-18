"use client";

import { LibraryBig, Telescope } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { Link } from "~/i18n/navigation";
import useMyTranslation from "~/i18n/translation-client";

export function NavMain() {
  const ctx = useSidebar();
  const { t } = useMyTranslation("common.sidebar");

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link
            href="/explore"
            onClick={() => ctx.isMobile && ctx.toggleSidebar()}
          >
            <SidebarMenuButton>
              <Telescope />
              <span>{t("explore")}</span>
            </SidebarMenuButton>
          </Link>
          <Link
            href="/my-collections"
            onClick={() => ctx.isMobile && ctx.toggleSidebar()}
          >
            <SidebarMenuButton>
              <LibraryBig />
              <span>{t("my-collection")}</span>
            </SidebarMenuButton>
          </Link>
          {/* TODO: Add favorites feature */}
          {/* <Link href="/favorites">
            <SidebarMenuButton>
              <Star />
              <span>Favorites</span>
            </SidebarMenuButton>
          </Link> */}
        </SidebarMenuItem>
      </SidebarMenu>
      {/* <SidebarGroupLabel>Wallpapers</SidebarGroupLabel> */}
      {/* <AppSidebarMenu /> */}
      {/* <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu> */}
    </SidebarGroup>
  );
}
