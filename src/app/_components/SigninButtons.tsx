"use client";

import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/navigation";

import { event } from "~/lib/gtag";

function SigninButtons() {
  const [isSignin, setIsSignin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [signinType, setSigninType] = useState("");
  async function signingIn(type: "google" | "github") {
    try {
      setIsLoading(true);
      setSigninType(type);
      await signIn(type);
      setSigninType("");
      setIsLoading(false);
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  }

  return (
    <div className="relative mx-auto mt-4 max-w-lg rounded-lg border bg-white p-4">
      <div className="mb-3">
        {isSignin ? "Sign in" : "Sign up"} with your <b>Google</b> or{" "}
        <b>Github</b> account
      </div>
      <div className="flex flex-col gap-2">
        <Button
          disabled={isLoading}
          onClick={() => {
            event({
              action: isSignin ? "signin_google" : "signup_google",
              category: "engagement",
              label: `User ${isSignin ? "signing in with Google" : "signing up with Google"}`,
            });
            signingIn("google");
          }}
        >
          {isLoading && signinType === "google" && (
            <Loader2 className="animate-spin" />
          )}
          <SiGoogle /> {isSignin ? "Login in" : "Sign up"} with Google
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => {
            event({
              action: isSignin ? "signin_github" : "signup_github",
              category: "engagement",
              label: `User ${isSignin ? "signing in with Github" : "signing up with Github"}`,
            });
            signingIn("github");
          }}
        >
          {isLoading && signinType === "github" && (
            <Loader2 className="animate-spin" />
          )}
          <SiGithub /> {isSignin ? "Login in" : "Sign up"} with Github
        </Button>
      </div>
      <p className="mt-4 text-center text-sm">
        {!isSignin
          ? "Already have an account?"
          : `Haven't got an account yet? Sign up`}{" "}
        <span
          onClick={() => setIsSignin(!isSignin)}
          className="cursor-pointer bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 font-bold text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]"
        >
          here
        </span>
      </p>
      <p className="mt-1 text-center text-sm">
        Or go back to{" "}
        <Link
          href="/"
          className="cursor-pointer bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 font-bold text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]"
        >
          Home
        </Link>
      </p>
    </div>
  );
}

export default SigninButtons;
