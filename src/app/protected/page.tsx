// app/dashboard/layout.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { auth } from "~/server/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  // If there's no session, redirect to login
  if (!session) {
    redirect("/api/auth/signin");
  }

  // Render the children (the page content)
  return (
    <div>
      <h1>Welcome to your dashboard, {session.user?.email}</h1>
      <div>{children}</div>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </div>
  );
}
