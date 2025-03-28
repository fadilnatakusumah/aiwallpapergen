import { redirect } from "next/navigation";

import { BackgroundLines } from "~/components/ui/background-lines";
import SigninButtons from "../../_components/SigninButtons";

import { auth } from "~/server/auth";

export default async function Auth() {
  const session = await auth();

  // If there's no session, redirect to login
  if (session) {
    redirect("/");
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-4">
      <BackgroundLines className="col-span-3 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
        <SigninButtons />
      </BackgroundLines>
    </div>
  );
}
