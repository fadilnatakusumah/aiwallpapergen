import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";

import { TolgeeNextProvider } from "~/tolgee/client";
import { getTolgee } from "~/tolgee/server";
import { ALL_LANGUAGES } from "~/tolgee/shared";

async function I18NProvider({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  if (!ALL_LANGUAGES.includes(locale)) {
    notFound();
  }

  const tolgee = await getTolgee();
  const records = await tolgee.loadRequired().catch(() => {
    return [];
  });

  return (
    <NextIntlClientProvider locale={locale}>
      <TolgeeNextProvider staticData={records} language={locale}>
        {children}
      </TolgeeNextProvider>
    </NextIntlClientProvider>
  );
}

export default I18NProvider;
