// src/hooks/useMyTranslation.ts
"use client";

import { useTranslate } from "@tolgee/react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

import { env } from "~/env";

/**
 * A unified translation function interface that supports:
 * - t(key, options)
 * - t.rich(key, options)
 * - t.markup(key, options)
 */
export type TranslationFunction = {
  t: {
    (key: string, options?: any): string;
    rich(
      key: string,
      options?: Record<string, (el: ReactNode) => ReactNode>,
    ): string;
    markup(key: string, options?: any): string;
  };
};

/**
 * A custom hook that returns a translation function abstracting between Tolgee and next‑intl.
 *
 * It chooses the underlying implementation based on the environment variable NEXT_PUBLIC_USE_TOLGEE.
 */
export default function useMyTranslation(key: string): TranslationFunction {
  const useTolgeeMode = env.NEXT_PUBLIC_USE_TOLGEE === "true";
  const tNextIntl = useTolgeeMode ? {} : useTranslations(key);
  const { t: tTolgee } = useTranslate();
  let t: unknown | any = tNextIntl;

  if (useTolgeeMode) {
    t = (keyTranslation: string) => tTolgee(`${key}.${keyTranslation}`);
    t.rich = (
      keyTranslation: string,
      options?: Record<string, (el: ReactNode) => ReactNode>,
    ) => {
      // return <T keyName={}/>

      return tTolgee(
        `${key}.${keyTranslation}`,
        typeof options === "string" ? options : "",
      );
    };
    t.markup = (keyTranslation: string, options?: any) =>
      tTolgee(`${key}.${keyTranslation}`, options);

    //  = (key: string, options?: any) => tTolgee(key, options);
    // t.markup = (key: string, options?: any) => tTolgee(key, options);
  }

  return { t } as TranslationFunction;
  //   if (useTolgeeMode) {
  //     // Use Tolgee's translation hook.
  //     const { t } = useTolgeeT(key);

  //     // Wrap Tolgee's basic translation function to match our interface.
  //     const tWrapper = ((key: string, options?: any) => {
  //       return tTolgee(key, options);
  //     }) as TranslationFunction;

  //     // Since Tolgee doesn't provide rich/markup out of the box,
  //     // we simply alias them to the basic function. You could enhance these later.
  //     tWrapper.rich = (key: string, options?: any) => tTolgee(key, options);
  //     tWrapper.markup = (key: string, options?: any) => tTolgee(key, options);

  //     return tWrapper;
  //   } else {
  //     // Use next-intl's translation hook.
  //     const tNext = useNextIntlTranslations();
  //     // next-intl's hook returns a function that already includes .rich and .markup methods.
  //     return tNext as TranslationFunction;
  //   }
}
