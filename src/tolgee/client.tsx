"use client";

import { type CacheInternalRecord, TolgeeProvider } from "@tolgee/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { TolgeeBase } from "./shared";

type Props = {
  staticData: CacheInternalRecord[];
  language: string;
  children: React.ReactNode;
};

const tolgee = TolgeeBase().init();

export const TolgeeNextProvider = ({
  language,
  staticData,
  children,
}: Props) => {
  const router = useRouter();

  useEffect(() => {
    const { unsubscribe } = tolgee.on("permanentChange", () => {
      router.refresh();
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <TolgeeProvider
      tolgee={tolgee}
      fallback="Loading"
      ssr={{ language, staticData }}
    >
      {children}
    </TolgeeProvider>
  );
};
