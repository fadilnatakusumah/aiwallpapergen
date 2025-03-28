import { FormatIcu } from "@tolgee/format-icu";
import { BackendFetch, DevTools, Tolgee, TolgeeOptions } from "@tolgee/web";

import enLocale from "~/../messages/en.json";
import idLocale from "~/../messages/id.json";

import { env } from "~/env";

export const ALL_LANGUAGES = ["en", "id"];
export const DEFAULT_LANGUAGE = "en";
export const defaultTolgeeOptions: TolgeeOptions = {
  apiKey: env.NEXT_PUBLIC_TOLGEE_API_KEY, // Replace with your Tolgee API key if needed
  apiUrl: env.NEXT_PUBLIC_TOLGEE_API_URL, // Your Tolgee instance URL
  language: "en", // Default language
  fallbackLanguage: "en",
  staticData: {
    en: enLocale,
    id: idLocale,
  },
};

// Initialize Tolgee with your configuration.
export const TolgeeBase = () =>
  Tolgee()
    .use(DevTools())
    .use(FormatIcu())
    .use(BackendFetch())
    // .use(FormatSimple())
    // .useI18nReact() // Optional: if you want integration with React’s context
    .updateDefaults(defaultTolgeeOptions);
