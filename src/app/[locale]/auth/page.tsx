import { BackgroundLines } from "~/components/ui/background-lines";
import { Button } from "~/components/ui/button";
// use import/esm to allow tree shaking
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import SigninButtons from "../../_components/SigninButtons";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Auth() {
  const session = await auth();

  // If there's no session, redirect to login
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4">
      <BackgroundLines className="col-span-3 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
        {/* <h2 className="relative z-20 bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text py-2 text-center font-sans text-xl font-bold tracking-tight text-transparent dark:from-neutral-600 dark:to-white md:py-3 md:text-4xl lg:text-7xl">
            AI Wallpaper Generator
          </h2>
          <p className="mx-auto max-w-xl text-center text-sm text-neutral-700 dark:text-neutral-400 md:text-lg">
            Create your own
            <span className="mx-1 bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 font-bold text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]">
              AWESOME
            </span>
            wallpaper.
          </p> */}

        <SigninButtons />
      </BackgroundLines>
    </div>
  );
}
