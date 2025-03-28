// src/hooks/useMyTranslation.ts
"use client";

import { CombinedOptions, T, useTranslate } from "@tolgee/react";
import { useTranslations } from "next-intl";
import { Fragment, ReactNode } from "react";

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
      options?: Record<string, ReactNode | ((el: ReactNode) => ReactNode)>,
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
  const { t: tTolgee } = useTranslate();
  // const tNextIntl = useTolgeeMode ? tTolgee : useTranslations(key);
  let t: unknown | any = useTolgeeMode ? tTolgee : useTranslations(key);

  if (useTolgeeMode) {
    t = (keyTranslation: string) => tTolgee(`${key}.${keyTranslation}`);
    t.rich = (
      keyTranslation: string,
      options?: Record<string, (el: ReactNode) => ReactNode>,
    ) => {
      if (options === undefined) return tTolgee(`${key}.${keyTranslation}`);

      return tTolgee(
        `${key}.${keyTranslation}`,
        typeof options === "string" ? options : `${key}.${keyTranslation}`,
        ((): CombinedOptions<ReactNode> => {
          const keysObjects: Record<string, any> = {};
          Object.keys(options!).forEach((key) => {
            keysObjects[key] = options![key] ?? (
              <Fragment
                key={`${key}.${keyTranslation}`}
              >{`${key}.${keyTranslation}`}</Fragment>
            );
          });
          return keysObjects;
        })() as CombinedOptions<any>,
      );
    };
    t.markup = (keyTranslation: string, options?: any) =>
      tTolgee(`${key}.${keyTranslation}`, options);
  }

  return { t } as TranslationFunction;
}
