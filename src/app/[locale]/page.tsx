import { User } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

import LanguageDropdown from "~/components/LanguageDropdown";
import { Button } from "~/components/ui/button";
import CTASection from "./(landing-page)/CTASection";
import FeaturesSection from "./(landing-page)/FeaturesSection";
import Footer from "./(landing-page)/Footer";
import GalleryPreview from "./(landing-page)/GalleryPreview";
import HeroSection from "./(landing-page)/HeroSection";
import PricingSection from "./(landing-page)/PricingSection";

import { Link } from "~/i18n/navigation";
import { getMyTranslation } from "~/i18n/translation-server";
import { auth } from "~/server/auth";
import { routing } from "~/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
/**
 * The homepage of the application.
 *
 * This page is the landing page for the application and is responsible for
 * rendering the main content of the application.
 *
 * @returns The JSX element for the homepage.
 */
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const session = await auth();
  const { t } = await getMyTranslation("common");

  if (session?.user.id) {
    redirect("/c");
  }

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        {/* Navigation */}
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link href={"/"}>
              <div className="flex items-center gap-2">
                <Image
                  className="inline-block"
                  alt="aiwallpapergen.com"
                  height={24}
                  width={24}
                  src="/og-image.png"
                />
                <span className="text-sm font-medium text-gray-900 md:text-xl">
                  AI{" "}
                  <strong className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text font-bold text-transparent">
                    Wallpaper
                  </strong>{" "}
                  Gen
                </span>
              </div>
            </Link>

            {/* <div className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-gray-700 transition-colors hover:text-gray-900"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-700 transition-colors hover:text-gray-900"
            >
              Pricing
            </Link>
            <Link
              href="#gallery"
              className="text-gray-700 transition-colors hover:text-gray-900"
            >
              Gallery
            </Link>
          </div> */}

            <div className="flex items-center gap-4">
              {/* <div className="hidden gap-2 md:flex">
              <Link
                href="https://twitter.com"
                target="_blank"
                aria-label="Twitter"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Twitter size={20} />
                </Button>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Instagram size={20} />
                </Button>
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                aria-label="GitHub"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Github size={20} />
                </Button>
              </Link>
            </div> */}
              <LanguageDropdown />

              <Link href="/auth">
                <Button className="bg-primary text-white hover:bg-primary/90">
                  <User />

                  {t("button.login")}
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Pricing Section */}
        <PricingSection />

        {/* Gallery Preview */}
        <GalleryPreview />

        {/* CTA Section */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
