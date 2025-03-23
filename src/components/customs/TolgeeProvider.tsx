// app/TolgeeProvider.tsx
"use client";

import React from "react";
import {
  DevTools,
  FormatSimple,
  Tolgee,
  TolgeeProvider,
  useTolgeeSSR,
} from "@tolgee/react";
import { env } from "~/env";

import enLocale from "~/../public/locales/en.json";
import idLocale from "~/../public/locales/id.json";

import { useLocale } from "next-intl";

// Initialize Tolgee with your configuration.
const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatSimple())
  // .useI18nReact() // Optional: if you want integration with React’s context
  .init({
    apiKey: env.NEXT_PUBLIC_TOLGEE_API_KEY, // Replace with your Tolgee API key if needed
    apiUrl: env.NEXT_PUBLIC_TOLGEE_API_URL, // Your Tolgee instance URL
    language: "en", // Default language
    fallbackLanguage: "en",
    staticData: {
      en: enLocale,
      id: idLocale,
    },
  });

export default function CustomTolgeeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentLocale = useLocale();
  const ssrTolgee = useTolgeeSSR(tolgee, currentLocale);

  return <TolgeeProvider tolgee={ssrTolgee}>{children}</TolgeeProvider>;
}
