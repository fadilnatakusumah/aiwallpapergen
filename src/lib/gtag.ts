"use client";

// src/lib/gtag.ts

import { env } from "~/env";
import { getDeviceType } from "~/helpers/device";

// Log a page view
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Log specific events (if needed)
export const event = ({
  action,
  category,
  label,
  value,
  ...rest
}: {
  action: string;
  category: string;
  label: string;
  value?: number | string;
} & Record<string, string | number>) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      timestamp: Date.now(),
      device: getDeviceType(),
      ...rest,
    });
  }
};
