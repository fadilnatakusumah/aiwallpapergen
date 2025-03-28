import { createServerInstance } from "@tolgee/react/server";
import { getLocale } from "next-intl/server";
import { TolgeeBase, defaultTolgeeOptions } from "./shared";

export const { getTolgee, getTranslate, T } = createServerInstance({
  getLocale: getLocale,
  createTolgee: async (language) => {
    return TolgeeBase().init({
      ...defaultTolgeeOptions,
      observerOptions: {
        fullKeyEncode: true,
      },
      language,
    });
  },
});
