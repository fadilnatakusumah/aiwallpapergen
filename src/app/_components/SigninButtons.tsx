"use client"
import { signIn } from "next-auth/react";
import React from "react";

function SigninButtons() {
  return (
    <>
      <button
        className="block rounded-lg px-4 py-2"
        onClick={() => signIn("google").catch(console.error)}
      >
        Sign in with Google
      </button>
      <button
        className="block rounded-lg px-4 py-2"
        onClick={() => signIn("github").catch(console.error)}
      >
        Sign in with Github
      </button>
    </>
  );
}

export default SigninButtons;
