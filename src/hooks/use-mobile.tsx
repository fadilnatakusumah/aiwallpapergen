"use client";

import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(
    typeof window === "undefined"
      ? undefined
      : window?.innerWidth < MOBILE_BREAKPOINT,
  );

  useEffect(() => {
    setIsMobile(window?.innerWidth < MOBILE_BREAKPOINT);
    const mql = window?.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window?.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
