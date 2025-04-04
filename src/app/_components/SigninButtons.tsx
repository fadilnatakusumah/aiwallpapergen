"use client";

import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { Fragment, useState } from "react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/navigation";
import useMyTranslation from "~/i18n/translation-client";
import { event } from "~/lib/gtag";

function SigninButtons() {
  const [isSignin, setIsSignin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [signinType, setSigninType] = useState("");
  const { t } = useMyTranslation("common");

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
      <div className="mb-3 text-center">
        {t.rich(
          isSignin ? "signin-with-your-account" : "signup-with-your-account",
          {
            strong: (chunks) => (
              <Fragment
              // key={
              //   isSignin
              //     ? "signin-with-your-account"
              //     : "signup-with-your-account"
              // }
              >
                <strong>{chunks}</strong>,
              </Fragment>
            ),
          },
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Button
          disabled={isLoading}
          onClick={async () => {
            event({
              action: isSignin ? "signin_google" : "signup_google",
              category: "engagement",
              label: `User ${isSignin ? "signing in with Google" : "signing up with Google"}`,
            });
            await signingIn("google").catch(console.error);
          }}
        >
          {isLoading && signinType === "google" && (
            <Loader2 className="animate-spin" />
          )}
          <SiGoogle />{" "}
          {t(isSignin ? "signin-with-google" : "signup-with-google")}
        </Button>
        <Button
          disabled={isLoading}
          onClick={async () => {
            event({
              action: isSignin ? "signin_github" : "signup_github",
              category: "engagement",
              label: `User ${isSignin ? "signing in with Github" : "signing up with Github"}`,
            });
            await signingIn("github").catch(console.error);
          }}
        >
          {isLoading && signinType === "github" && (
            <Loader2 className="animate-spin" />
          )}
          <SiGithub />{" "}
          {t(isSignin ? "signin-with-github" : "signup-with-github")}
        </Button>
      </div>
      <p className="mt-4 text-center text-sm">
        {t.rich(
          !isSignin ? "already-have-an-account" : "dont-have-an-account",
          {
            here: (chunks: React.ReactNode) => (
              <Fragment
              // key={
              //   !isSignin ? "already-have-an-account" : "dont-have-an-account"
              // }
              >
                <span
                  onClick={() => setIsSignin(!isSignin)}
                  className="cursor-pointer bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 font-bold text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]"
                >
                  {chunks}
                </span>
              </Fragment>
            ),
          },
        )}
      </p>
      <p className="mt-1 text-center text-sm">
        {t.rich("back-to-home", {
          home: (chunks: React.ReactNode) => (
            <Fragment
            //  key={"back-to-home"}
            >
              <Link
                href="/"
                className="cursor-pointer bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 font-bold text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]"
              >
                {chunks}
              </Link>
            </Fragment>
          ),
        })}
      </p>
    </div>
  );
}

export default SigninButtons;
