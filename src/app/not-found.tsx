import { redirect } from "next/navigation";
import React from "react";
import { auth } from "~/server/auth";

async function NotFoundPage() {
  const session = await auth();

  // If there's no session, redirect to login
  if (!session) {
    redirect("/status");
  }

  return null;
}

export default NotFoundPage;
