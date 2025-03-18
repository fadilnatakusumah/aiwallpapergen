import { redirect } from "next/navigation";

import { pageview } from "~/lib/gtag";
import { auth } from "~/server/auth";

async function LandingPage() {
  pageview("/");

  const authSession = await auth();

  if (authSession?.user.id) {
    redirect("/c");
  }

  return <h1>Landing Page</h1>;
}

export default LandingPage;
