"use client";

import HeroBackground from "~/components/hero-background";
import InfiniteCarousel from "~/components/infinite-carousel";
import MotionWrapper from "~/components/MotionWrapper";
import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/navigation";

import useMyTranslation from "~/i18n/translation-client";
import { fadeIn, staggerContainer } from "./const";
import { Fragment } from "react";

function HeroSection() {
  const { t } = useMyTranslation("landing-page.hero-section");

  return (
    <section className="relative flex min-h-screen items-center justify-center">
      <div className="container relative z-10 min-h-screen bg-red-100">
        <HeroBackground />

        <div className="relative z-20 pt-36">
          <MotionWrapper
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <MotionWrapper
              tag="h1"
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl lg:text-7xl"
              variants={fadeIn}
            >
              {t.rich("greeting", {
                "colored-text": (chunks) => (
                  <Fragment key={"colored-text"}>
                    <br className="hidden md:block" />

                    <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                      {chunks}
                    </span>
                  </Fragment>
                ),
              })}
            </MotionWrapper>

            <MotionWrapper
              tag="p"
              className="mx-auto mb-10 max-w-2xl px-4 text-gray-700 md:text-xl"
              variants={fadeIn}
            >
              {t("description")}
            </MotionWrapper>
            <MotionWrapper
              key={"button"}
              className="flex flex-col justify-center gap-4 sm:flex-row"
              variants={fadeIn}
            >
              <Link href="/c">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white hover:opacity-90"
                >
                  {t("generate")}
                </Button>
              </Link>
              {/* <Button
            size="lg"
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Explore Gallery
          </Button> */}
            </MotionWrapper>
          </MotionWrapper>
        </div>

        {/* Dynamic Wallpaper Carousel */}
        <MotionWrapper
          className="relative space-y-8 pt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <InfiniteCarousel />
        </MotionWrapper>

        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-background to-transparent md:w-24"></div>
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-background to-transparent md:w-24"></div>

        {/* <div>HALLO</div> */}
      </div>
    </section>
  );
}

export default HeroSection;
