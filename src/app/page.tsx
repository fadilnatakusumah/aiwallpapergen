import Link from "next/link";
import { redirect } from "next/navigation";
import HeroInputPrompt from "~/components/HeroInputPromp";
import HeroTypedAnimation from "~/components/HeroTypedAnimation";
import { Input } from "~/components/ui/input";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import SigninButtons from "./_components/SigninButtons";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  const session = await auth();

  // Futuristic Cyberpunk Cityscape
  // An ultra-detailed, 8K cyberpunk cityscape at night, with neon-lit skyscrapers, glowing holograms, and vibrant signage reflecting off rain-soaked streets. The scene is ultra-realistic, with atmospheric fog and a sense
  // of motion as futuristic vehicles pass by. Customize the scene
  // with flying cars to create an immersive experience.
  // Galactic Space Nebula An ultra-HD, 8K cosmic wallpaper featuring a stunning galactic nebula with colorful clouds of interstellar dust, stars of varying brightness, and planets in the distance. The nebula’s intricate details give depth and a sense of endless wonder. Adjust with asteroids to create a personalized view of the cosmos.
  // Minimalist Abstract Art A minimalist 8K abstract wallpaper featuring clean lines, geometric shapes, and a modern color palette. The design balances bold color blocks with subtle gradients for a sophisticated, timeless look that adapts well to desktop and mobile screens. Enhance
  // the look with matte for a more
  // customized style.
  // Mystical Enchanted Forest A high-definition, ultra-realistic enchanted forest at dawn, captured in 8K resolution. Sunlight filters through a misty canopy of ancient trees, casting magical beams of light on glowing plants and mushrooms. The scene feels serene and alive, with intricate textures on each leaf and bark. Add dragon to enhance the magical atmosphere.
  // Tropical Island Paradise A vibrant, photo-realistic 8K tropical island scene, with turquoise
  // water gently lapping against golden sands. Palm trees sway in
  // a light breeze under a glowing
  // sunset sky in pink and orange hues. The scene captures the beauty of paradise with detailed textures in the water and sand.
  // Add birds for an even more immersive feel.
  // Vintage Botanical Illustration
  // An 8K resolution vintage botanical illustration of various plants and flowers, captured with
  // highly realistic textures and detailed linework. The muted, pastel color palette is inspired
  // by antique botanical art, giving it a classical, timeless look that adapts beautifully to desktop and mobile. Add rose flowers for a unique, tailored touch

  // console.log(
  //   "Futuristic Cyberpunk Cityscape",
  //   WALLPAPERS_PROMPT["Futuristic Cyberpunk Cityscape"](),
  // );
  // console.log(
  //   "Galactic Space Nebula",
  //   WALLPAPERS_PROMPT["Galactic Space Nebula"](),
  // );
  // console.log(
  //   "Minimalist Abstract Art",
  //   WALLPAPERS_PROMPT["Minimalist Abstract Art"](),
  // );
  // console.log(
  //   "Mystical Enchanted Forest",
  //   WALLPAPERS_PROMPT["Mystical Enchanted Forest"](),
  // );
  // console.log(
  //   "Tropical Island Paradise",
  //   WALLPAPERS_PROMPT["Tropical Island Paradise"](),
  // );
  // console.log(
  //   "Vintage Botanical Illustration",
  //   WALLPAPERS_PROMPT["Vintage Botanical Illustration"](),
  // );

  // Create reference to store the DOM element containing the animation

  // If there's no session, redirect to login
  // if (!session) {
  //   redirect("/status");
  // }

  return (
    <HydrateClient>
      <main
        className="container flex h-screen w-full flex-col items-center justify-center overflow-y-auto pr-7"
        // bg-gradient-to-b from-[#2e026d] to-[#15162c]
      >
        <HeroTypedAnimation />
        <div className="w-full max-w-screen-lg">
          <HeroInputPrompt
            className="text-xl outline-none"
            placeholder="Type your prompt here.."
          />
        </div>
        {/* <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps →</h3>
              <div className="text-lg">
                Just the basics - Everything you need to know to set up your
                database and authentication.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>

              {session?.user ? (
                <Link
                  href={
                    session?.user ? "/api/auth/signout" : "/api/auth/signin"
                  }
                  className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
                >
                  {session ? "Sign out" : "Sign in"}
                </Link>
              ) : (
                <SigninButtons />
              )}
              <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
          </div>

          {session?.user && <Link href="/generate">Go to Dashboard</Link>}
        </div> */}
      </main>
    </HydrateClient>
  );
}
