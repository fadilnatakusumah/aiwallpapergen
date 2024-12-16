"use client";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

function SigninButtons() {
  return (
    <>
      <Button onClick={() => signIn("google").catch(console.error)}>
        <SiGoogle /> Login with Google
      </Button>
      <Button onClick={() => signIn("github").catch(console.error)}>
        <SiGithub /> Login with Github
      </Button>
    </>
  );
}

export default SigninButtons;
