import { hasLocale } from "next-intl";

import { notFound } from "next/navigation";
import { routing } from "~/i18n/routing";

async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "id" }>;
}>) {
  // // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <>{children}</>;
}

export default RootLayout;
