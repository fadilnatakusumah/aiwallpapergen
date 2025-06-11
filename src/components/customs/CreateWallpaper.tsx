"use client";

import { TRPCClientError } from "@trpc/client";
import clsx from "clsx";
import { BanIcon, InfoIcon, MessageSquareCode } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PhotoSlider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Spinner } from "~/components/ui/spinner";
import { Textarea } from "~/components/ui/textarea";
import { ModalDialog } from "../Modal";
import MotionWrapper from "../MotionWrapper";
import GeneratingWallpaper from "../ui/GeneratingWallpaper";

import { useForm } from "react-hook-form";
import { SUGGESTION_TYPE_URL, WALLPAPERS_TYPE } from "~/data/prompt";
import { useInfinitePrompt } from "~/hooks/prompt";
import useMyTranslation, {
  getTranslationManually,
} from "~/i18n/translation-client";
import { getDeviceAgentInfo, getDeviceUUID } from "~/lib/device";
import { appDriver } from "~/lib/driver";
import { event } from "~/lib/gtag";
import { api } from "~/trpc/react";
import { useSidebar } from "../ui/sidebar";

export default function CreateWallpaper() {
  const params = useParams<{ id: string }>();
  const { register, handleSubmit, setValue, formState, getValues } = useForm({
    defaultValues: {
      prompt: "",
      amount: 1,
    },
  });

  const { isLoading, data, refetch } = useInfinitePrompt({
    id: params.id,
    enabled: Boolean(params.id),
  });

  const trpcContext = api.useUtils();

  const [form, setForm] = useState({
    prompt: "",
    amount: 1,
  });
  const session = useSession();
  const router = useRouter();
  const sidebar = useSidebar();
  const { t } = useMyTranslation("creating-wallpaper");

  const [wallpaperType, setWallpaperType] = useState<WALLPAPERS_TYPE>();
  const [isShowPreview, setShowPreview] = useState(false);
  const [isShowModalCreate, setShowModalCreate] = useState(false);
  const [index, setIndex] = useState(0);
  // const { driver } = useDriver();

  const generateWallpaperAPI = api.wallpaper.generateWallpaper.useMutation({
    async onSuccess(data) {
      scrollToBottom();
      if (data.data.chat_id) {
        await trpcContext.chat.myChats.invalidate().catch(console.error);
        await session.update();
        // after setting the cookie from the server, trigger signIn
        router.push(`/c/${data.data.chat_id}`);
        if (!session.data?.user) {
          await signIn("credentials", { redirect: false });
          window.location.reload();
        }
      } else if (params?.id) {
        setForm({ prompt: "", amount: 1 });
        await refetch?.().catch(console.error);
      }
    },
    onError(error) {
      if (error instanceof TRPCClientError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });

  const isSubmitting = generateWallpaperAPI.status === "pending";
  const isAuthenticated = session.data?.user;
  // const isDisabled = isSubmitting || !isAuthenticated;

  function generate(_data: { prompt: string; amount: number }) {
    scrollToBottom();
    event({
      action: "create_wallpaper",
      category: "content_creation",
      label: "User Created Wallpaper",
      prompt: form.prompt,
      user_id: session.data?.user.id ?? "", // Include if available
      count: form.amount, // Number of wallpapers generated
      prompt_length: form.prompt.length, // Length of the prompt (number of characters)
    });

    generateWallpaperAPI.mutate({
      prompt: getValues("prompt"),
      type: wallpaperType! || null,
      amount: getValues("amount"),
      chatId: params?.id ?? "",
      userId: session.data?.user.id ?? "",
      deviceUuid: getDeviceUUID(),
      deviceInfo: JSON.stringify(getDeviceAgentInfo()),
    });

    setTimeout(() => {
      setShowModalCreate(false);
      scrollToBottom();
    }, 3000);
  }

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [data?.pages]);

  const promptChats = useMemo(() => {
    return (
      data?.pages.flatMap(({ prompts }) =>
        prompts.reverse().flatMap(({ wallpapers }) =>
          wallpapers.flatMap((wallpaper) => ({
            src: wallpaper.url ?? "",
            key: wallpaper.id ?? "",
          })),
        ),
      ) ?? []
    );
  }, [data?.pages]);

  function createForm() {
    return (
      <form onSubmit={handleSubmit(generate)}>
        <div id="promptField" className="rounded-lg bg-slate-100 p-4">
          <div className="mb-1 font-semibold">{t("prompt")}</div>
          <Textarea
            className="h-12 min-h-24 w-full bg-white pe-9"
            placeholder={t("prompt-placeholder")}
            // value={formState.}
            // disabled={isDisabled}
            // onChange={({ target }) =>
            //   setForm((prev) => ({ ...prev, prompt: target.value }))
            // }
            {...register("prompt", {
              required: {
                value: true,
                message: getTranslationManually(
                  "Prompt harus diisi",
                  "Prompt is required",
                ),
              },
              minLength: {
                value: 5,
                message: getTranslationManually(
                  "Prompt harus memiliki minimal 5 karakter",
                  "Prompt must have at least 5 characters",
                ),
              },
            })}
            // onKeyDown={(event) => {
            //   if (event.key === "Enter") {
            //     generate();
            //   }
            // }}
          />

          {formState.errors.prompt?.message && (
            <div className="mt-1 text-xs text-red-500">
              {formState.errors.prompt?.message}
            </div>
          )}
        </div>

        <div className="mt-4 rounded-lg bg-slate-100 p-4">
          <div className="mb-1">
            <span className="font-semibold">{t("preset-styles")}</span>
            <span className="text-xs">
              {!!wallpaperType && ` (${wallpaperType})`}
            </span>
          </div>
          <ScrollArea>
            <div className="flex h-full min-h-28 flex-nowrap gap-6 overflow-hidden pb-4">
              <div className="relative">
                {wallpaperType === undefined && (
                  <svg
                    className="icon z-2 absolute left-0 top-0 flex-none opacity-100"
                    width="65"
                    height="65"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_7175_24042)">
                      <path
                        d="M1 16C1 7.71573 7.71573 1 16 1H64C72.2843 1 79 7.71573 79 16V64C79 72.2843 72.2843 79 64 79H16C7.71573 79 1 72.2843 1 64V16Z"
                        stroke="url(#paint0_linear_7175_24042)"
                        strokeWidth="2"
                      ></path>
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_7175_24042"
                        x1="8.57143"
                        y1="40"
                        x2="68.4265"
                        y2="56.2848"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#DC4DFF"></stop>
                        <stop offset="0.968876" stopColor="#5A42FF"></stop>
                      </linearGradient>
                      <clipPath id="clip0_7175_24042">
                        <path
                          d="M0 16C0 7.16344 7.16344 0 16 0H64C72.8366 0 80 7.16344 80 16V64C80 72.8366 72.8366 80 64 80H16C7.16344 80 0 72.8366 0 64V16Z"
                          fill="white"
                        ></path>
                      </clipPath>
                    </defs>
                  </svg>
                )}

                <div
                  onClick={() => {
                    if (isSubmitting) return;
                    setWallpaperType(undefined);
                  }}
                  className={clsx(
                    "flex items-center justify-center",
                    "h-16 w-16 cursor-pointer overflow-hidden rounded-xl border-[3px] bg-gradient-to-r from-blue-500 to-purple-300 bg-clip-border text-center",
                    isSubmitting && "!cursor-not-allowed grayscale",
                    // isAuthenticated &&
                    "hover:border-transparent",
                  )}
                >
                  <BanIcon size={50} opacity={0.3} />
                </div>
                <div className="mt-1 text-center text-xs">{"None"}</div>
              </div>

              {Object.values(WALLPAPERS_TYPE).map((value, idx) => (
                <div className="relative" key={value}>
                  {wallpaperType === value && (
                    <div className="icon absolute left-0 top-0 z-20 flex-none opacity-100">
                      <svg
                        width="65"
                        height="65"
                        viewBox="0 0 80 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_7175_24042)">
                          <path
                            d="M1 16C1 7.71573 7.71573 1 16 1H64C72.2843 1 79 7.71573 79 16V64C79 72.2843 72.2843 79 64 79H16C7.71573 79 1 72.2843 1 64V16Z"
                            stroke="url(#paint0_linear_7175_24042)"
                            strokeWidth="2"
                          ></path>
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_7175_24042"
                            x1="8.57143"
                            y1="40"
                            x2="68.4265"
                            y2="56.2848"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#DC4DFF"></stop>
                            <stop offset="0.968876" stopColor="#5A42FF"></stop>
                          </linearGradient>
                          <clipPath id="clip0_7175_24042">
                            <path
                              d="M0 16C0 7.16344 7.16344 0 16 0H64C72.8366 0 80 7.16344 80 16V64C80 72.8366 72.8366 80 64 80H16C7.16344 80 0 72.8366 0 64V16Z"
                              fill="white"
                            ></path>
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  )}

                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      if (isSubmitting) return;
                      setWallpaperType(
                        wallpaperType === value ? undefined : value,
                      );
                    }}
                  >
                    <div
                      className={clsx(
                        // "border-8",
                        "h-16 w-16 overflow-hidden rounded-xl border-[3px] bg-gradient-to-r from-blue-500 to-purple-300 bg-clip-border text-center",
                        isSubmitting && "!cursor-not-allowed grayscale",
                        "hover:border-transparent",
                      )}
                      key={value}
                    >
                      <Image
                        alt={value}
                        src={`/images/suggestions/${SUGGESTION_TYPE_URL[idx]}.png`}
                        width={100}
                        height={100}
                        className="mx-auto h-full w-full rounded-sm object-cover object-center text-center"
                      />
                    </div>
                    <div className="mt-1 text-center text-xs">{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        <div className="mt-4 rounded-lg bg-slate-100 p-4">
          <div className="mb-2 font-semibold">{t("generate-amount")}</div>
          <div className={clsx("flex items-center gap-2")}>
            {[...Array(4)].map((_, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (!isAuthenticated) return;
                  setValue("amount", idx + 1);
                  // setForm((prev) => ({ ...prev, amount: idx + 1 }));
                }}
                className={clsx(
                  "flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border-2 bg-gray-200 text-center",
                  isSubmitting && "!cursor-not-allowed grayscale",
                  "hover:border-purple-300",
                  getValues("amount") === idx + 1 &&
                    "bg-gradient-to-r from-blue-500 to-purple-300 bg-clip-border",
                )}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-slate-100 p-4">
          {isSubmitting && (
            <div className="mb-3 flex gap-2 rounded-lg bg-white p-2">
              <InfoIcon size={32} />
              <span className="text-sm">{t("be-patient-information")}</span>
            </div>
          )}

          {/* <pre>{JSON.stringify(formState.errors, null, 2)}</pre> */}
          {/* {Object.values(formState.errors).length && (
            <div className="mb-3 flex gap-2 rounded-lg bg-white p-2">
              <InfoIcon size={32} />
              <span className="text-sm">
                {formState.errors.amount?.message ||
                  formState.errors.prompt?.message}
              </span>
            </div>
          )} */}
          <Button
            className="w-full"
            type="submit"
            // onClick={generate}
            aria-label="Generate"
            // disabled={isDisabled}
          >
            {isSubmitting ? (
              <>
                <Spinner className="text-white" />{" "}
                <span>{t("generating")}</span>
              </>
            ) : (
              //  : !isAuthenticated ? (
              //   <span>{t("login-to-generate")}</span>
              // )
              <>
                <span>{t("generate")}</span>
                {/* <span className="ml-1 flex items-center gap-1 text-xs">
                  <Stars size={8} />
                  {t.rich("your-credit-left", {
                    amount: session?.data?.user?.credits ?? 1,
                  })}
                </span> */}
              </>
            )}
          </Button>
        </div>
      </form>
    );
  }

  const runDriver = useCallback(() => {
    const LS_DRIVER_KEY = "aiwallpapergen-isDriverAlreadyDone";
    const isDriverAlreadyDone = localStorage.getItem(LS_DRIVER_KEY);

    if (isDriverAlreadyDone === "true") return;

    if (sidebar.isMobile) {
      const driverObj = appDriver({
        onCloseClick: () => {
          driverObj.destroy();
        },
        popoverClass: "driverjs-theme",
        showProgress: false,
        nextBtnText: getTranslationManually("Selanjutnya", "Next"),
        prevBtnText: getTranslationManually("Sebelumnya", "Prev"),
        doneBtnText: getTranslationManually("Selesai", "Done"),
        steps: [
          {
            element: "#create-wallpaper",
            popover: {
              title: getTranslationManually(
                "Buat Wallpaper",
                "Create a Wallpaper",
              ),
              description: getTranslationManually(
                "Buat wallpaper kamu melalui tombol ini.",
                "Create your wallpaper through this buttons.",
              ),
            },
          },
          {
            element: "#wallpaper-result",
            popover: {
              title: getTranslationManually(
                "Hasil Wallpaper",
                "Wallpaper Result",
              ),
              description: getTranslationManually(
                "Hasil wallpaper kamu yang telah di generate akan muncul disini.",
                "Your generated wallpaper will appear here.",
              ),
            },
          },
          {
            element: "#sidebar-trigger",
            popover: {
              onNextClick: () => {
                localStorage.setItem(LS_DRIVER_KEY, "true");
                driverObj.destroy();
              },
              title: getTranslationManually(
                "Histori Wallpaper",
                "History Wallpaper",
              ),
              description: getTranslationManually(
                "Semua prompt wallpaper yang telah kamu buat akan muncul disini.",
                "All your generated wallpapers will appear here.",
              ),
            },
          },
        ],
      });

      driverObj.drive();

      return;
    }

    const driverObj = appDriver({
      popoverClass: "driverjs-theme",
      showProgress: false,
      nextBtnText: getTranslationManually("Selanjutnya", "Next"),
      prevBtnText: getTranslationManually("Sebelumnya", "Prev"),
      doneBtnText: getTranslationManually("Selesai", "Done"),
      steps: [
        {
          element: "#promptField",
          popover: {
            title: getTranslationManually("Input Prompt", "Prompt Field"),
            description: getTranslationManually(
              "Masukan prompt untuk wallpaper yang ingin kamu buat disini.",
              "Type your prompt to generate your wallpaper here.",
            ),
          },
        },
        {
          element: "#wallpaper-result",
          popover: {
            title: getTranslationManually(
              "Hasil Wallpaper",
              "Wallpaper Result",
            ),
            description: getTranslationManually(
              "Hasil wallpaper kamu yang telah di generate akan muncul disini.",
              "Your generated wallpaper will appear here.",
            ),
          },
        },
        {
          element: "#wallpaper-chats",
          popover: {
            onNextClick: () => {
              localStorage.setItem(LS_DRIVER_KEY, "true");
              driverObj.destroy();
            },
            title: getTranslationManually(
              "Histori Wallpaper",
              "History Wallpaper",
            ),
            description: getTranslationManually(
              "Semua prompt wallpaper yang telah kamu buat akan muncul disini.",
              "All your generated wallpapers will appear here.",
            ),
          },
        },
      ],
    });

    driverObj.drive();
  }, [sidebar.isMobile]);

  useEffect(() => {
    runDriver();
  }, [runDriver, sidebar.isMobile]);

  return (
    <div className="relative flex h-full bg-gradient-to-b from-blue-50 to-white">
      <PhotoSlider
        images={promptChats}
        visible={isShowPreview}
        onClose={() => setShowPreview(false)}
        index={index}
        onIndexChange={setIndex}
      />

      {!!promptChats.length && !isLoading ? (
        <ScrollArea className="flex-1 border-r">
          {/* TODO: make better "view-all wallpapers in chat" feature */}
          {/* {!!promptChats.length && (
            <div className="absolute left-0 right-0 z-10 flex bg-slate-300 bg-opacity-85">
              {data?.pages.flatMap(({ prompts }) =>
                prompts.map(({ wallpapers }) => (
                  <div key={wallpapers[0]?.id}>
                    <Image
                      className="cursor-pointer brightness-75 filter"
                      src={wallpapers[0]?.url as string}
                      alt=""
                      width={120}
                      height={120}
                      onClick={() => {
                        setShowPreview(true);
                        setIndex(
                          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                          promptChats.findIndex(
                            (chat) => chat.src === wallpapers[0]!.url,
                          ),
                        );
                      }}
                    />
                  </div>
                )),
              )}
            </div>
          )} */}

          <div className="mx-auto max-w-screen-lg flex-col pl-4 pr-4 md:px-7">
            <div className="flex flex-1 flex-col-reverse border-none px-0 pt-10">
              <div ref={messagesEndRef} />

              {isSubmitting && (
                <MotionWrapper
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 3 }}
                  className="mb-4 aspect-video"
                >
                  <GeneratingWallpaper />
                </MotionWrapper>
              )}

              {data?.pages.flatMap((prompt) =>
                prompt.prompts.map((promptChat, idx) => (
                  <div
                    key={`${promptChat.wallpapers[0]!.url}_${idx}`}
                    className="mb-7 flex flex-col gap-4 pb-5 sm:gap-4 md:gap-5"
                  >
                    {promptChat.wallpapers.length > 1 ? (
                      <div
                        style={{ scrollbarWidth: "thin" }}
                        className="flex gap-4 overflow-y-clip overflow-x-scroll overscroll-x-auto pb-4"
                        // className="scrollbar scrollbar-h-[6px] scrollbar-track-transparent scrollbar-thumb-rounded-full scrollbar-thumb-gradient-to-r scrollbar-thumb-from-primary/60 scrollbar-thumb-to-primary/80 hover:scrollbar-thumb-from-primary/70 hover:scrollbar-thumb-to-primary/90 dark:scrollbar-thumb-from-primary/40 dark:scrollbar-thumb-to-primary/60 dark:hover:scrollbar-thumb-from-primary/50 dark:hover:scrollbar-thumb-to-primary/70 flex gap-4 overflow-x-auto overscroll-x-auto pb-4 transition-colors duration-200"
                      >
                        {promptChat.wallpapers.map((wallpaper) => (
                          <div
                            key={wallpaper.id}
                            // className="relative h-full w-full flex-none overflow-hidden rounded-lg"
                            className="relative flex h-full w-full flex-none snap-start items-center gap-4 overflow-hidden rounded-lg border border-border/30 shadow-sm transition-shadow duration-300 hover:shadow-md"
                          >
                            <Image
                              id={wallpaper.id}
                              width={500}
                              height={300}
                              style={{ width: "100%", height: "auto" }} // Responsive with aspect ratio maintained
                              className="cursor-pointer rounded-lg transition-all hover:scale-[1.02]"
                              src={wallpaper.url}
                              alt={`wallpaper-${promptChat.prompt_sent}`}
                              onClick={() => {
                                setShowPreview(true);
                                setIndex(
                                  promptChats.findIndex(
                                    (chat) => chat.src === wallpaper.url,
                                  ),
                                );
                              }}
                            />

                            {/* <div className="flex flex-col gap-0.5"> */}
                            {/* TODO: Create 'full-screen' button */}
                            {/* <Button
                            variant={"outline"}
                            size={"icon"}
                            onClick={async () => {
                              const imageEl = document.getElementById(
                                promptChat.wallpapers[0]!.id,
                              )!;
                              if (imageEl.requestFullscreen) {
                                await imageEl.requestFullscreen();
                              } else if (
                                (imageEl as any).mozRequestFullScreen
                              ) {
                                await (imageEl as any).mozRequestFullScreen();
                              } else if (
                                (imageEl as any).webkitRequestFullscreen
                              ) {
                                await (
                                  imageEl as any
                                ).webkitRequestFullscreen();
                              } else if ((imageEl as any).msRequestFullscreen) {
                                await (imageEl as any).msRequestFullscreen();
                              }
                              setOnFullScreen(true);
                            }}
                          >
                            <Expand />
                          </Button> */}
                            {/* <Button
                              variant={"outline"}
                              size={"icon"}
                              onClick={async () =>
                                downloadImage(promptChat.wallpapers[0]!.url)
                              }
                            >
                              <Download />
                            </Button>
                          </div> */}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-4 overflow-hidden rounded-lg">
                        <Image
                          id={promptChat.wallpapers[0]!.id}
                          width={500}
                          height={300}
                          style={{ width: "100%", height: "auto" }} // Responsive with aspect ratio maintained
                          className="cursor-pointer rounded-lg transition-all hover:scale-[1.02]"
                          src={promptChat.wallpapers[0]!.url}
                          alt={`wallpaper-${promptChat.prompt_sent}`}
                          onClick={() => {
                            setShowPreview(true);
                            setIndex(
                              promptChats.findIndex(
                                (chat) =>
                                  chat.src === promptChat.wallpapers[0]!.url,
                              ),
                            );
                          }}
                        />
                      </div>
                    )}

                    <div className="max-w-lg self-end rounded-lg bg-slate-200 px-3 py-2 leading-none">
                      {promptChat.prompt || promptChat.prompt_sent}
                    </div>
                  </div>
                )),
              )}
            </div>
          </div>
        </ScrollArea>
      ) : isSubmitting ? (
        <ScrollArea className="flex-1 border-r">
          <div className="mx-auto max-w-screen-lg flex-col pl-4 pr-4 md:px-7">
            <div className="flex flex-1 flex-col-reverse border-none px-0 pt-10">
              <MotionWrapper
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3 }}
                className="aspect-video"
              >
                <GeneratingWallpaper />
              </MotionWrapper>
            </div>
          </div>
        </ScrollArea>
      ) : (
        <div
          id="wallpaper-result"
          className="flex h-full w-full flex-col items-center justify-center border-r px-4"
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <Image
                className="rounded-md opacity-75"
                src="/images/others/placeholder.jpg"
                alt=""
                width={300}
                height={100}
                priority
              />
              <div className="mt-2 max-w-lg text-center text-sm text-gray-500">
                {t("unlock-your-creativity")}
              </div>
            </>
          )}
        </div>
      )}

      <div className="sticky top-0 hidden h-fit max-w-96 bg-white p-5 lg:block">
        {createForm()}
      </div>

      <div className="fixed bottom-5 right-5 lg:hidden">
        <Button
          id="create-wallpaper"
          className="rounded-full"
          onClick={() => setShowModalCreate(true)}
        >
          <MessageSquareCode />
          {t("create-a-wallpaper")}
        </Button>
      </div>

      <ModalDialog
        title={t("create-a-wallpaper")}
        isOpen={isShowModalCreate}
        onClose={() => setShowModalCreate(false)}
      >
        {createForm()}
      </ModalDialog>
    </div>
  );
}
