// // import Link from "next/link";
// // import { redirect } from "next/navigation";
// // import HeroInputPrompt from "~/components/HeroInputPromp";
// // import HeroTypedAnimation from "~/components/HeroTypedAnimation";
// // import { Input } from "~/components/ui/input";
// // import { auth } from "~/server/auth";
// // import { api, HydrateClient } from "~/trpc/server";
// // import SigninButtons from "./_components/SigninButtons";

// // export default async function Home() {
// //   const hello = await api.post.hello({ text: "from tRPC" });

// //   const session = await auth();

// //   // Futuristic Cyberpunk Cityscape
// //   // An ultra-detailed, 8K cyberpunk cityscape at night, with neon-lit skyscrapers, glowing holograms, and vibrant signage reflecting off rain-soaked streets. The scene is ultra-realistic, with atmospheric fog and a sense
// //   // of motion as futuristic vehicles pass by. Customize the scene
// //   // with flying cars to create an immersive experience.
// //   // Galactic Space Nebula An ultra-HD, 8K cosmic wallpaper featuring a stunning galactic nebula with colorful clouds of interstellar dust, stars of varying brightness, and planets in the distance. The nebula’s intricate details give depth and a sense of endless wonder. Adjust with asteroids to create a personalized view of the cosmos.
// //   // Minimalist Abstract Art A minimalist 8K abstract wallpaper featuring clean lines, geometric shapes, and a modern color palette. The design balances bold color blocks with subtle gradients for a sophisticated, timeless look that adapts well to desktop and mobile screens. Enhance
// //   // the look with matte for a more
// //   // customized style.
// //   // Mystical Enchanted Forest A high-definition, ultra-realistic enchanted forest at dawn, captured in 8K resolution. Sunlight filters through a misty canopy of ancient trees, casting magical beams of light on glowing plants and mushrooms. The scene feels serene and alive, with intricate textures on each leaf and bark. Add dragon to enhance the magical atmosphere.
// //   // Tropical Island Paradise A vibrant, photo-realistic 8K tropical island scene, with turquoise
// //   // water gently lapping against golden sands. Palm trees sway in
// //   // a light breeze under a glowing
// //   // sunset sky in pink and orange hues. The scene captures the beauty of paradise with detailed textures in the water and sand.
// //   // Add birds for an even more immersive feel.
// //   // Vintage Botanical Illustration
// //   // An 8K resolution vintage botanical illustration of various plants and flowers, captured with
// //   // highly realistic textures and detailed linework. The muted, pastel color palette is inspired
// //   // by antique botanical art, giving it a classical, timeless look that adapts beautifully to desktop and mobile. Add rose flowers for a unique, tailored touch

// //   // console.log(
// //   //   "Futuristic Cyberpunk Cityscape",
// //   //   WALLPAPERS_PROMPT["Futuristic Cyberpunk Cityscape"](),
// //   // );
// //   // console.log(
// //   //   "Galactic Space Nebula",
// //   //   WALLPAPERS_PROMPT["Galactic Space Nebula"](),
// //   // );
// //   // console.log(
// //   //   "Minimalist Abstract Art",
// //   //   WALLPAPERS_PROMPT["Minimalist Abstract Art"](),
// //   // );
// //   // console.log(
// //   //   "Mystical Enchanted Forest",
// //   //   WALLPAPERS_PROMPT["Mystical Enchanted Forest"](),
// //   // );
// //   // console.log(
// //   //   "Tropical Island Paradise",
// //   //   WALLPAPERS_PROMPT["Tropical Island Paradise"](),
// //   // );
// //   // console.log(
// //   //   "Vintage Botanical Illustration",
// //   //   WALLPAPERS_PROMPT["Vintage Botanical Illustration"](),
// //   // );

// //   // Create reference to store the DOM element containing the animation

// //   // If there's no session, redirect to login
// //   // if (!session) {
// //   //   redirect("/status");
// //   // }

// //   return (
// //     <HydrateClient>
// //       <main
// //         className="container flex h-screen w-full flex-col items-center justify-center overflow-y-auto pr-7"
// //         // bg-gradient-to-b from-[#2e026d] to-[#15162c]
// //       >
// //         <HeroTypedAnimation />
// //         <div className="w-full max-w-screen-lg">
// //           <HeroInputPrompt
// //             className="text-xl outline-none"
// //             placeholder="Type your prompt here.."
// //           />
// //         </div>
// //         {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
// //           <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
// //             Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
// //           </h1>
// //           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
// //             <Link
// //               className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
// //               href="https://create.t3.gg/en/usage/first-steps"
// //               target="_blank"
// //             >
// //               <h3 className="text-2xl font-bold">First Steps →</h3>
// //               <div className="text-lg">
// //                 Just the basics - Everything you need to know to set up your
// //                 database and authentication.
// //               </div>
// //             </Link>
// //             <Link
// //               className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
// //               href="https://create.t3.gg/en/introduction"
// //               target="_blank"
// //             >
// //               <h3 className="text-2xl font-bold">Documentation →</h3>
// //               <div className="text-lg">
// //                 Learn more about Create T3 App, the libraries it uses, and how
// //                 to deploy it.
// //               </div>
// //             </Link>
// //           </div>
// //           <div className="flex flex-col items-center gap-2">
// //             <p className="text-2xl text-white">
// //               {hello ? hello.greeting : "Loading tRPC query..."}
// //             </p>

// //             <div className="flex flex-col items-center justify-center gap-4">
// //               <p className="text-center text-2xl text-white">
// //                 {session && <span>Logged in as {session.user?.name}</span>}
// //               </p>

// //               {session?.user ? (
// //                 <Link
// //                   href={
// //                     session?.user ? "/api/auth/signout" : "/api/auth/signin"
// //                   }
// //                   className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
// //                 >
// //                   {session ? "Sign out" : "Sign in"}
// //                 </Link>
// //               ) : (
// //                 <SigninButtons />
// //               )}
// //               <pre>{JSON.stringify(session, null, 2)}</pre>
// //             </div>
// //           </div>

// //           {session?.user && <Link href="/generate">Go to Dashboard</Link>}
// //         </div> */}
// //       </main>
// //     </HydrateClient>
// //   );
// // }

// "use client";

// import clsx from "clsx";
// import { Expand, Send, Star, StarIcon, StarOff, Stars } from "lucide-react";
// import { type NextPageContext, type NextPage } from "next";
// import Image from "next/image";
// import React, { use, useEffect, useMemo, useRef, useState } from "react";
// import { Input } from "~/components/ui/input";
// import { Label } from "~/components/ui/label";
// import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
// import { Separator } from "~/components/ui/separator";
// import { Spinner } from "~/components/ui/spinner";
// import { WALLPAPERS_TYPE } from "~/data/prompt";
// import { useInfinitePrompt } from "~/hooks/prompt";
// import { api } from "~/trpc/react";
// import { format, formatRelative, subDays } from "date-fns";
// import { formatDate } from "~/helpers/date";
// import { type Prompt } from "@prisma/client";

// import { PhotoProvider, PhotoSlider, PhotoView } from "react-photo-view";
// import "react-photo-view/dist/react-photo-view.css";
// import { Button } from "~/components/ui/button";
// import { HexColorPicker } from "react-colorful";
// import { PopoverColorPicker } from "~/components/PopoverColorPicker";
// import { Textarea } from "~/components/ui/textarea";
// import { useSession } from "next-auth/react";

// const SuggestionsUrls = [
//   "futuristic",
//   "galactic",
//   "minimalist",
//   "mystical",
//   "tropical",
//   "vintage",
// ];

// export default function Chat({ params }: { params: Promise<{ id: string }> }) {
//   const useParams = use(params);
//   const { data, refetch } = useInfinitePrompt({ id: useParams?.id });
//   const [color, setColor] = useState("#aabbcc");
//   const [form, setForm] = useState({
//     prompt: "",
//   });
//   const session = useSession();
//   // const [data, setData] = useState<GenerateWallpaper>();
//   const [wallpaperType, setWallpaperType] = useState<WALLPAPERS_TYPE>();
//   const [isLoading, setLoading] = useState(false);
//   const [isShowPreview, setShowPreview] = useState(false);

//   const [index, setIndex] = useState(0);
//   const [errorMessage, setErrorMessage] = useState<string>();
//   const generateWallpaperAPI = api.wallpaper.generateWallpaper.useMutation({
//     onSuccess(data) {
//       refetch().catch(console.error);
//       // setData(data);
//     },
//     onError(error) {
//       setErrorMessage(error.message as string);
//     },
//     onSettled() {
//       setLoading(false);
//       setForm({ prompt: "" });
//     },
//   });

//   function generate() {
//     setLoading(true);
//     setErrorMessage("");
//     generateWallpaperAPI.mutate({
//       prompt: form.prompt,
//       type: wallpaperType!,
//       chatId: useParams?.id,
//     });
//   }

//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [data?.pages]);

//   const promptChats = useMemo(() => {
//     return (
//       data?.pages.flatMap(({ prompts }) =>
//         prompts.map(({ wallpapers }) => ({
//           src: wallpapers[0]?.url ?? "",
//           key: wallpapers[0]?.user_id ?? "",
//         })),
//       ) || []
//     );
//   }, [data?.pages]);

//   return (
//     <main className="h-full">
//       <div
//         className="flex h-full overflow-y-hidden"
//         //  className="flex h-full"
//       >
//         <PhotoSlider
//           images={promptChats}
//           visible={isShowPreview}
//           onClose={() => setShowPreview(false)}
//           index={index}
//           onIndexChange={setIndex}
//         />
//         {/* <div className="relative">
//         <div className="absolute left-0 right-0 z-10 flex bg-slate-300 bg-opacity-85">
//           {
//             data?.pages.flatMap(({ prompts }) =>
//               prompts.map(({ wallpapers }) => (
//                 <div key={wallpapers[0]?.id}>
//                   <Image
//                     className="cursor-pointer brightness-75 filter"
//                     src={wallpapers[0]?.url as string}
//                     alt=""
//                     width={120}
//                     height={120}
//                     onClick={() => {
//                       setShowPreview(true);
//                       setIndex(
//                         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//                         promptChats.findIndex(
//                           (chat) => chat.src === wallpapers[0]!.url,
//                         ),
//                       );
//                     }}
//                   />
//                 </div>
//               )),
//             )

//             // .map((item, index) => (
//             //   <PhotoView key={index} src={item}>
//             //     <img src={item} alt="" />
//             //   </PhotoView>
//             // ))
//           }
//         </div>
//       </div> */}
//         {/* <div className="h-full border-r p-5">
//           <PopoverColorPicker color={color} onChange={setColor} />
//         </div> */}
//         {/* <Separator orientation="vertical" /> */}
//         {session?.data?.user && (
//           <ScrollArea className="flex-1">
//             <div className="mx-auto max-w-screen-lg flex-col pl-4 pr-4 md:px-7">
//               <div className="flex flex-1 flex-col-reverse border-none px-0 pt-10">
//                 <div ref={messagesEndRef} />
//                 {data?.pages.flatMap((prompt) =>
//                   prompt.prompts.map(
//                     (
//                       promptChat: Prompt & { wallpapers: { url: string }[] },
//                     ) => (
//                       <div
//                         key={promptChat.id}
//                         className="mb-7 flex flex-col gap-4 pb-5 sm:gap-4 md:gap-5"
//                       >
//                         <div className="flex items-center gap-4">
//                           <Image
//                             id={promptChat.chat_id}
//                             className="cursor-pointer rounded-lg transition-all hover:scale-105"
//                             width={500}
//                             height={300}
//                             src={promptChat.wallpapers[0]!.url}
//                             alt={`wallpaper-${promptChat.prompt_sent}`}
//                             onClick={() => {
//                               setShowPreview(true);
//                               setIndex(
//                                 // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//                                 promptChats.findIndex(
//                                   (chat) =>
//                                     chat.src === promptChat.wallpapers[0]!.url,
//                                 ),
//                               );
//                             }}
//                           />
//                           {/* <Button
//                         variant={"outline"}
//                         size={"icon"}
//                         onClick={async () => {
//                           const imageEl = document.getElementById(
//                             promptChat.chat_id,
//                           )!;
//                           if (imageEl.requestFullscreen) {
//                             await imageEl.requestFullscreen();
//                           } else if (imageEl.webkitRequestFullscreen) {
//                             await imageEl.webkitRequestFullscreen?.();
//                           } else if (imageEl.msRequestFullscreen) {
//                             await imageEl.msRequestFullscreen();
//                           }
//                         }}
//                       >
//                         <Expand />
//                       </Button> */}
//                         </div>
//                         <div className="max-w-lg self-end rounded-lg bg-slate-200 px-3 py-2 leading-none">
//                           {promptChat.prompt || promptChat.prompt_sent}
//                         </div>
//                         {/* <div>{format(promptChat.created_at, "mm-dd-yyyy")}</div> */}
//                       </div>
//                     ),
//                   ),
//                 )}
//               </div>
//             </div>
//           </ScrollArea>
//         )}

//         {
//           <div className="flex h-full w-full flex-col items-center justify-center">
//             <Image
//               className="rounded-md opacity-75"
//               src="/images/others/placeholder.jpg"
//               alt=""
//               width={300}
//               height={100}
//             />
//             <div className="mt-2 max-w-lg text-center text-sm text-gray-500">
//               Unlock your creative potential and experience the awesomeness of
//               AI Wallpaper Gen right now!
//             </div>
//           </div>
//         }
//         <form className="max-w-96 border-l p-5">
//           <div className="rounded-lg bg-slate-100 p-4">
//             <div className="mb-1 font-semibold">Prompt</div>
//             <Textarea
//               // id="input-19"
//               className="h-12 min-h-24 w-full bg-white pe-9"
//               placeholder="Create a neon-lit cyberpunk cityscape at dusk"
//               value={form.prompt}
//               disabled={isLoading}
//               onChange={({ target }) => setForm({ prompt: target.value })}
//               onKeyDown={(event) => {
//                 if (event.key === "Enter") {
//                   generate();
//                 }
//               }}
//             />
//           </div>

//           <div className="mt-4 rounded-lg bg-slate-100 p-4">
//             <div className="mb-1 font-semibold">Preset Styles</div>
//             <ScrollArea>
//               <div className="flex h-full min-h-28 flex-nowrap gap-6 overflow-hidden pb-4">
//                 {Object.values(WALLPAPERS_TYPE).map((value, idx) => (
//                   <div className="relative">
//                     {wallpaperType === value && (
//                       <svg
//                         className="icon z-2 absolute left-0 top-0 flex-none opacity-100"
//                         width="65"
//                         height="65"
//                         viewBox="0 0 80 80"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <g clip-path="url(#clip0_7175_24042)">
//                           <path
//                             d="M1 16C1 7.71573 7.71573 1 16 1H64C72.2843 1 79 7.71573 79 16V64C79 72.2843 72.2843 79 64 79H16C7.71573 79 1 72.2843 1 64V16Z"
//                             stroke="url(#paint0_linear_7175_24042)"
//                             stroke-width="2"
//                           ></path>
//                         </g>
//                         <defs>
//                           <linearGradient
//                             id="paint0_linear_7175_24042"
//                             x1="8.57143"
//                             y1="40"
//                             x2="68.4265"
//                             y2="56.2848"
//                             gradientUnits="userSpaceOnUse"
//                           >
//                             <stop stop-color="#DC4DFF"></stop>
//                             <stop offset="0.968876" stop-color="#5A42FF"></stop>
//                           </linearGradient>
//                           <clipPath id="clip0_7175_24042">
//                             <path
//                               d="M0 16C0 7.16344 7.16344 0 16 0H64C72.8366 0 80 7.16344 80 16V64C80 72.8366 72.8366 80 64 80H16C7.16344 80 0 72.8366 0 64V16Z"
//                               fill="white"
//                             ></path>
//                           </clipPath>
//                         </defs>
//                       </svg>
//                     )}

//                     <div
//                       onClick={() =>
//                         setWallpaperType(
//                           wallpaperType === value ? undefined : value,
//                         )
//                       }
//                       className={clsx(
//                         "h-16 w-16 cursor-pointer overflow-hidden rounded-xl border-[3px] bg-gradient-to-r from-blue-500 to-purple-300 bg-clip-border text-center hover:border-transparent",
//                         // "h-28 w-full cursor-pointer overflow-hidden rounded-lg border-4 border-transparent object-contain",
//                         // wallpaperType === value
//                         //   ? "border-transparent bg-gradient-to-r from-blue-500 to-purple-300 bg-clip-border"
//                         //   : "border-transparent",
//                       )}
//                       key={value}
//                     >
//                       <Image
//                         alt={value}
//                         src={`/images/suggestions/${SuggestionsUrls[idx]}.png`}
//                         width={100}
//                         height={100}
//                         className="mx-auto h-full w-full rounded-sm object-cover object-center text-center"
//                       />
//                     </div>
//                     <div className="mt-1 text-center text-xs">{value}</div>
//                   </div>
//                 ))}
//               </div>
//               <ScrollBar orientation="horizontal" />
//             </ScrollArea>
//           </div>

//           <div className="mt-4 rounded-lg bg-slate-100 p-4">
//             <Button className="w-full">
//               <span>Generate</span>
//               <span className="ml-1 flex items-center gap-1 text-xs">
//                 <Stars size={8} />1 Credits
//               </span>
//             </Button>
//             {/* <button
//               onClick={generate}
//               className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
//               aria-label="Subscribe"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <Spinner />
//               ) : (
//                 <Send size={16} strokeWidth={2} aria-hidden="true" />
//               )}
//             </button> */}
//           </div>
//         </form>
//       </div>

//       {/* <div className="sticky bottom-0 z-10 border border-x-0 bg-white px-4 py-6 md:px-20"> */}
//       {/* <div>
//             <Label className="block">Select a preset type</Label>
//             <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
//               {Object.values(WALLPAPERS_TYPE).map((value, idx) => (
//                 <div
//                   onClick={() =>
//                     setWallpaperType(
//                       wallpaperType === value ? undefined : value,
//                     )
//                   }
//                   className={clsx(
//                     "h-20 w-full cursor-pointer overflow-hidden rounded-lg border-4 border-transparent object-contain",
//                     wallpaperType === value && "border-4 border-blue-300",
//                   )}
//                   key={value}
//                 >
//                   <Image
//                     alt={value}
//                     src={`/images/suggestions/${SuggestionsUrls[idx]}.png`}
//                     width={800}
//                     height={400}
//                     className="object-contain"
//                   />
//                   <div>{value}</div>
//                 </div>
//               ))}
//             </div>
//           </div> */}
//       {/* <div className="relative">
//           <Input
//             // id="input-19"
//             className="h-12 w-full pe-9"
//             placeholder="Type your prompt here"
//             value={form.prompt}
//             type="text"
//             disabled={isLoading}
//             onChange={({ target }) => setForm({ prompt: target.value })}
//             onKeyDown={(event) => {
//               if (event.key === "Enter") {
//                 generate();
//               }
//             }}
//           />
//           <button
//             onClick={generate}
//             className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
//             aria-label="Subscribe"
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <Spinner />
//             ) : (
//               <Send size={16} strokeWidth={2} aria-hidden="true" />
//             )}
//           </button>
//         </div> */}
//       {/* </div> */}
//     </main>
//   );
// }
"use client";

import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect } from "react";

function LandingPage() {
  const session = useSession();
  console.log("🚀 ~ LandingPage ~ session:", session);
  const pathname = usePathname();
  console.log("🚀 ~ LandingPage ~ pathname:", pathname);

  // If there's no session, redirect to login
  // if (!session?.user.id) {
  //   redirect("/auth");
  // } else {
  //   redirect("/c");
  // }
  // if(pathname)
  // const session = useSession();
  useEffect(() => {
    if (session.data?.user?.id) {
      redirect("/c");
    }
  }, [session]);

  if (session.status === "loading") return null;

  return <div>LandingPage</div>;
}

export default LandingPage;
