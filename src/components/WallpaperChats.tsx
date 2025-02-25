"use client";

import {
  BadgeInfoIcon,
  Edit,
  Folder,
  Forward,
  InfoIcon,
  MoreHorizontal,
  PlusIcon,
  Search,
  SquarePen,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import {
  type KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";
import { useInfiniteChats } from "~/hooks/chat";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { useRouter, useParams } from "next/navigation";
import { Input } from "./ui/input";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";

export function WallpaperChats() {
  const { isMobile } = useSidebar();
  const {
    data,
    isLoading,
    fetchNextPage,

    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteChats();
  const [edittedID, setEdittedID] = useState("");
  const [edittedValue, setEdittedValue] = useState("");
  const [isLoadingUpdate, setLoadingUpdate] = useState("");
  const session = useSession();

  const { ref, inView } = useInView();
  const params = useParams();

  const updateNameAPI = api.chat.updateChatName.useMutation();

  // Trigger fetching when the "load more" element is visible
  useEffect(() => {
    (async () => {
      if (inView && hasNextPage) {
        await fetchNextPage();
      }
    })().catch(console.error);
  }, [inView, hasNextPage, fetchNextPage]);

  function onBlurSubmit(chat: { title: string }) {
    if (edittedValue && edittedID && edittedValue !== chat.title) {
      setLoadingUpdate(edittedID);
      updateNameAPI.mutate(
        {
          chatId: edittedID,
          name: edittedValue,
        },
        {
          onSuccess: () => {
            refetch()
              .catch(console.error)
              .finally(() => {
                setLoadingUpdate("");
              });
          },
        },
      );
    }
    setEdittedID("");
    setEdittedValue("");
  }

  function onKeyDownInput(chat: { title: string }) {
    return (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onBlurSubmit(chat);
      }
    };
  }

  useEffect(() => {
    if (edittedID) {
      document.getElementById(edittedID)?.focus();
    }
  }, [edittedID]);
  
  return (
    <SidebarGroup className="h-full group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex justify-between">
        <div className="text-base">Wallpapers</div>
        <div>
          <Button className="mr-1" size={"icon"} variant={"ghost"}>
            <Search />
          </Button>
          <Button size={"icon"} variant={"ghost"}>
            <Link href={"/c"}>
              <SquarePen />
            </Link>
          </Button>
        </div>
      </SidebarGroupLabel>
      {!!session.data?.user ? (
        <SidebarMenu>
          {isLoading ? (
            <div className="mx-2.5 pt-2">
              {/* {[...Array(5)].map((_, idx) => (
                <Skeleton
                  key={idx}
                  className="mb-4 h-[20px] w-full rounded-full last:mb-0"
                />
              ))} */}
              <Spinner />
            </div>
          ) : (
            data?.pages.flatMap((page) =>
              page.chats.map((chat) => (
                <SidebarMenuItem
                  className={cn(chat.id === params?.id && "bg-sidebar-accent")}
                  key={chat.id}
                  title={chat.title}
                >
                  {chat.id === isLoadingUpdate ? (
                    <div className="flex items-center">
                      <Skeleton className="mb-4 h-[24px] w-full rounded-full last:mb-0" />
                    </div>
                  ) : chat.id === edittedID ? (
                    <div className="px-2">
                      <Input
                        id={chat.id}
                        value={edittedValue}
                        placeholder="Type the chat's name"
                        onBlur={() => onBlurSubmit(chat)}
                        onChange={({ target }) => setEdittedValue(target.value)}
                        onKeyDown={onKeyDownInput(chat)}
                      />
                    </div>
                  ) : (
                    <SidebarMenuButton asChild>
                      <Link href={`/c/${chat.id}`}>
                        <span>{chat.title || "No name for chat"}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}

                  {chat.id !== edittedID && chat.id !== isLoadingUpdate && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover={chat.id !== params?.id}>
                          <MoreHorizontal />
                          <span className="sr-only">More</span>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-48 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align={isMobile ? "end" : "start"}
                      >
                        <DropdownMenuItem
                          onClick={() => {
                            setEdittedID(chat.id);
                            setEdittedValue(chat.title);
                          }}
                        >
                          <Edit className="text-muted-foreground" />
                          <span>Rename</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Trash2 className="text-muted-foreground" />
                          <span>Delete Project</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </SidebarMenuItem>
              )),
            )
          )}
          {/* {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Folder className="text-muted-foreground" />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))} */}
          <div ref={ref}>
            {isFetchingNextPage ? (
              <p>Loading...</p>
            ) : hasNextPage ? (
              <p>Scroll to load more</p>
            ) : null}
          </div>
          {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
        </SidebarMenu>
      ) : (
        <div className="flex h-full items-center px-2 text-xs">
          <span className="mr-3">
            <BadgeInfoIcon />
          </span>
          Sign in with your account to see your history
        </div>
      )}
    </SidebarGroup>
  );
}
