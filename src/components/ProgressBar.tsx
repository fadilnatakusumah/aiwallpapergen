"use client";

import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import { ReactNode } from "react";

function ProgressBarProvider({ children }: { children: ReactNode }) {
  return (
    <ProgressProvider
      height="4px"
      color="#5A42FF"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
}

export default ProgressBarProvider;
