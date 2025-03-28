import { BackgroundLines } from "~/components/ui/background-lines";

export default function Auth() {
  return (
    <BackgroundLines className="flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
      <div>
        <h2 className="relative z-20 bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text py-2 text-center font-sans text-2xl font-bold tracking-tight text-transparent dark:from-neutral-600 dark:to-white md:py-3 md:text-4xl lg:text-7xl">
          AI Wallpaper Generator
        </h2>
        <p className="mx-auto max-w-xl text-center text-sm text-neutral-700 dark:text-neutral-400 md:text-lg">
          Create your own
          {/* <span className="relative bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4">
          <span className="">AWESOME</span>
        </span> */}
          <span className="mx-1 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 font-bold text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]">
            AWESOME
          </span>
          {/* <Cover>AWESOME</Cover> */}
          wallpaper.
        </p>

        <div className="mt-10 text-center text-xs">
          This website is still in development 🔥
        </div>
      </div>
    </BackgroundLines>
  );
}
