import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

async function NotFoundPage() {
  const session = await auth();

  // If there's no session, redirect to login
  // if (!session) {
  //   redirect("/status");
  // }

  return (
    <div>
      <h1>Not Found Page</h1>
    </div>
  );
}

export default NotFoundPage;
