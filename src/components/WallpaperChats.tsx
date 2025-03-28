"use client";

import { type Chat } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeInfoIcon,
  Edit,
  MoreHorizontal,
  Search,
  SquarePen,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import {
  type RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useInView } from "react-intersection-observer";
import { useOnClickOutside } from "usehooks-ts";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Link } from "~/i18n/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { Spinner } from "./ui/spinner";

import { useInfiniteChats } from "~/hooks/chat";
import { event } from "~/lib/gtag";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import useMyTranslation from "~/i18n/translation-client";

export function WallpaperChats() {
  const session = useSession();
  const { isMobile } = useSidebar();
  const { t } = useMyTranslation("common.sidebar");
  const {
    data,
    isLoading,
    hasNextPage,
    error,
    // isFetchingNextPage,

    fetchNextPage,
    refetch,
  } = useInfiniteChats();
  const ctx = useSidebar();

  const [isShowSearchField, setShowSearchField] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [edittedID, setEdittedID] = useState("");
  const [edittedValue, setEdittedValue] = useState("");
  const [isLoadingUpdate, setLoadingUpdate] = useState("");

  const refSearchInput = useRef<HTMLInputElement>(null);
  const {
    //  ref,
    inView,
  } = useInView();
  const params = useParams();
  const isUserExist = session.data?.user;
  const updateNameAPI = api.chat.updateChatName.useMutation();

  // Trigger fetching when the "load more" element is visible
  useEffect(() => {
    (async () => {
      if (inView && hasNextPage) {
        await fetchNextPage?.();
      }
    })().catch(console.error);
  }, [inView, hasNextPage, fetchNextPage]);

  function onBlurSubmit(chat: { title: Chat["title"]; id: Chat["id"] }) {
    if (edittedValue && edittedID && edittedValue !== chat.title) {
      setLoadingUpdate(edittedID);
      event({
        action: "rename_chat",
        category: "chat_management",
        label: "User Renamed Chat",
        user_id: session.data?.user?.id ?? "", // Include if available
        chat_id: chat.id,
        old_title: chat.title,
        new_title: edittedValue,
        timestamp: Date.now(),
      });
      updateNameAPI.mutate(
        {
          chatId: edittedID,
          name: edittedValue,
        },
        {
          onSuccess: () => {
            refetch().catch(console.error);
            setLoadingUpdate("");
          },
        },
      );
    }
    setEdittedID("");
    setEdittedValue("");
  }

  function onKeyDownInput(chat: { title: Chat["title"]; id: Chat["id"] }) {
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

  useOnClickOutside(refSearchInput as RefObject<HTMLElement>, () => {
    setShowSearchField(false);
    setSearchText("");
  });

  useLayoutEffect(() => {
    if (refSearchInput.current && isShowSearchField) {
      refSearchInput.current.focus();
    }
  }, [isShowSearchField]);

  // const chats = useMemo(() => {
  //   return (
  //     data?.pages
  //       .flatMap((page) => page.chats.flatMap((chats) => chats))
  //       .filter(
  //         (chat) =>
  //           chat.title.toLowerCase().includes(searchText.toLowerCase()) ||
  //           chat.wallpapers.some((wallpaper) =>
  //             wallpaper.prompt.prompt
  //               .toLowerCase()
  //               .includes(searchText.toLowerCase()),
  //           ),
  //       ) ?? []
  //   );
  // }, [data?.pages?.[0]?.chats, searchText]);

  // const pages = data?.pages ?? [];
  const chats = useMemo(() => {
    return data?.pages
      .flatMap((page) => page.chats.flatMap((chats) => chats))
      .filter(
        (chat) =>
          chat.title.toLowerCase().includes(searchText.toLowerCase()) ||
          chat.wallpapers.some((wallpaper) =>
            wallpaper.prompt.prompt
              .toLowerCase()
              .includes(searchText.toLowerCase()),
          ),
      );
  }, [data?.pages, searchText]);

  return (
    <SidebarGroup className="h-full group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex justify-between">
        <div className="text-base">{t("wallpaper")}</div>
        <div>
          <Button
            className="mr-1"
            size={"icon"}
            variant={"ghost"}
            onClick={() => setShowSearchField(true)}
          >
            <Search />
          </Button>
          <Button size={"icon"} variant={"ghost"}>
            <Link href={"/c"}>
              <SquarePen />
            </Link>
          </Button>
        </div>
      </SidebarGroupLabel>

      <AnimatePresence mode="wait">
        {isShowSearchField && (
          <motion.div
            key="fade-content"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative rounded bg-gray-100 px-2 py-1"
          >
            <Input
              ref={refSearchInput}
              className="border-gray-200 bg-white shadow !ring-gray-400"
              onChange={({ target }) => setSearchText(target.value)}
              value={searchText}
              placeholder={t("search-text-placeholder")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* TODO: refactor this so it can be better */}
      {error?.message === "UNAUTHORIZED" || !isUserExist ? (
        <div className="flex h-full items-center px-2 text-xs">
          <span className="mr-3">
            <BadgeInfoIcon />
          </span>
          {t("signup-to-see-history")}
        </div>
      ) : isLoading ? (
        <SidebarMenu>
          <div className="mx-2.5 pt-6">
            <Spinner />
          </div>
        </SidebarMenu>
      ) : session.status === "authenticated" ? (
        <>
          {!chats?.length ? (
            <div className="px-2 pt-4 text-center text-xs text-slate-500">
              {t("create-your-wallpaper")}
            </div>
          ) : (
            chats.map((chat) => (
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
                  <div className="mb-1 px-2">
                    <Input
                      className="bg-white text-sm"
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
                    <Link
                      href={`/c/${chat.id}`}
                      onClick={() => isMobile && ctx.toggleSidebar()}
                    >
                      <span>{chat.title || t("no-name-chat")}</span>
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
                        <span>{t("rename-chat")}</span>
                      </DropdownMenuItem>
                      {/* TODO: add delete chat feature */}
                      {/* <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Project</span>
                      </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </SidebarMenuItem>
            ))
          )}
        </>
      ) : null}
    </SidebarGroup>
  );
}
