"use client";

import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { event } from "~/lib/gtag";

function SigninButtons() {
  const [isSignin, setIsSignin] = useState(true);
  return (
    <div className="relative mx-auto mt-4 max-w-lg rounded-lg border bg-white p-4">
      <div className="mb-3">
        {isSignin ? "Sign in" : "Sign up"} with your <b>Google</b> or{" "}
        <b>Github</b> account
      </div>
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => {
            event({
              action: isSignin ? "signin_google" : "signup_google",
              category: "engagement",
              label: `User ${isSignin ? "signing in with Google" : "signing up with Google"}`,
            });
            signIn("google").catch(console.error);
          }}
        >
          <SiGoogle /> {isSignin ? "Login in" : "Sign up"} with Google
        </Button>
        <Button
          onClick={() => {
            event({
              action: isSignin ? "signin_github" : "signup_github",
              category: "engagement",
              label: `User ${isSignin ? "signing in with Github" : "signing up with Github"}`,
            });
            signIn("github").catch(console.error);
          }}
        >
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
    </div>
  );
}

export default SigninButtons;
