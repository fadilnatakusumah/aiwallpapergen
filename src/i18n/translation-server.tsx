import { Formats } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";
import { env } from "~/env";
import { getTranslate, T } from "~/tolgee/server";

export async function getMyTranslation(key: string) {
  const isUseTolgee = env.SERVER_USE_TOLGEE === "true";

  const tTolgee = await getTranslate();
  const tNextIntl = await getTranslations(key);

  let t: any = (
    keyTranslation: string,
    options?: Record<string, string | number | Date> | undefined,
    formats?: Formats,
  ) => {
    return isUseTolgee
      ? tTolgee(`${key}.${keyTranslation}`)
      : tNextIntl(`${keyTranslation}`, options, formats);
  };

  if (isUseTolgee) {
    t.rich = (keyTranslation: string) => {
      return <T keyName={`${key}.${keyTranslation}`} params={{}} />;
    };
  }

  return { t };
}
