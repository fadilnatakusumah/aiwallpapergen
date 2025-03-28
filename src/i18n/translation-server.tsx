import { type Formats } from "next-intl";
import { getTranslations } from "next-intl/server";
import { type ReactNode } from "react";
import { env } from "~/env";
import { getTranslate, T } from "~/tolgee/server";

// type TranslateFunction = {
//   (
//     keyTranslation: string,
//     options?: Record<string, string | number | Date>,
//     formats?: Formats,
//   ): string;
// } & {
//   rich?: (keyTranslation: string) => ReactNode;
// };

type TranslateFunction = ((
  keyTranslation: string,
  options?: Record<string, string | number | Date>,
  formats?: Formats,
) => string) & {
  rich?: (
    keyTranslation: string,
    options?: Record<string, string | number | Date>,
  ) => ReactNode;
};

export async function getMyTranslation(
  key: string,
): Promise<{ t: TranslateFunction }> {
  const isUseTolgee = env.SERVER_USE_TOLGEE === "true";

  const tTolgee = await getTranslate();
  const tNextIntl = await getTranslations(key);

  const t: TranslateFunction = (
    keyTranslation: string,
    options?: Record<string, string | number | Date>,
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
