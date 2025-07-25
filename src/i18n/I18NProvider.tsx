import { type CacheInternalRecord } from "@tolgee/react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";
import { env } from "~/env";
import { TolgeeNextProvider } from "~/tolgee/client";

import { getTolgee } from "~/tolgee/server";
import { ALL_LANGUAGES } from "~/tolgee/shared";

async function I18NProvider({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const isUseTolgee = env.SERVER_USE_TOLGEE === "true";

  if (!ALL_LANGUAGES.includes(locale)) {
    notFound();
  }

  let records: CacheInternalRecord[] = [];

  const tolgee = await getTolgee();
  records = isUseTolgee
    ? await tolgee
        .loadRequired({
          language: locale,
        })
        .catch(() => {
          return [];
        })
    : [];

  return (
    <NextIntlClientProvider locale={locale}>
      <TolgeeNextProvider staticData={records} language={locale}>
        {children}
      </TolgeeNextProvider>
    </NextIntlClientProvider>
  );
}

export default I18NProvider;
