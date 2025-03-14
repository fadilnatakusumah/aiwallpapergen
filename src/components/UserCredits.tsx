"use client";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "./ui/button";

function UserCredits() {
  const { data } = useSession();
  return (
    <>
      Your credits{" "}
      <span className="flex items-center justify-center rounded-full bg-slate-500 px-1 py-0.5 text-white">
        {data?.user?.credits || 0}
      </span>
      <Button size={"icon"} variant={"outline"}>
        <Plus />
      </Button>
    </>
  );
}

export default UserCredits;
