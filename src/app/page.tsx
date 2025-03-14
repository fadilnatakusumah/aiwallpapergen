import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

async function LandingPage() {
  const authSession = await auth();

  if (authSession?.user.id) {
    redirect("/c");
  }
  
  return <div>LandingPage</div>;
}

export default LandingPage;
