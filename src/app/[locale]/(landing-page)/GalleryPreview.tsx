"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/navigation";

import { fadeIn, staggerContainer } from "./const";
import useMyTranslation from "~/i18n/translation-client";

const wallpapersDesktop = [
  { id: 1, src: "/images/gallery/1.png", alt: "Wallpaper 1" },
  { id: 2, src: "/images/gallery/2.png", alt: "Wallpaper 2" },
  { id: 3, src: "/images/gallery/3.png", alt: "Wallpaper 3" },
  { id: 4, src: "/images/gallery/4.png", alt: "Wallpaper 4" },
];
const wallpapersMobile = [
  { id: 5, src: "/images/gallery/5.png", alt: "Wallpaper 5" },
  { id: 6, src: "/images/gallery/6.png", alt: "Wallpaper 6" },
  { id: 7, src: "/images/gallery/7.png", alt: "Wallpaper 7" },
  { id: 8, src: "/images/gallery/8.png", alt: "Wallpaper 8" },
];

function GalleryPreview() {
  const { t } = useMyTranslation("landing-page.gallery-showcase-section");

  return (
    <section id="gallery" className="bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-16 text-center text-3xl font-semibold text-gray-900 md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("title")}
        </motion.h2>

        {/* <motion.div
        className="mb-8 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <DeviceSelector />
      </motion.div> */}

        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Desktop wallpapers (16:9 aspect ratio) */}
          {wallpapersDesktop.map((wallpaper, i) => (
            <motion.div
              key={`desktop-${i}`}
              className="aspect-[16/9] overflow-hidden rounded-lg shadow-md"
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                width={500}
                height={300}
                style={{ width: "100%", height: "auto" }} // Responsive with aspect ratio maintained
                src={wallpaper.src}
                alt={`Desktop AI Wallpaper ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}

          {/* Mobile wallpapers (9:16 aspect ratio) */}
          {wallpapersMobile.map((wallpaper, i) => (
            <motion.div
              key={`mobile-${i}`}
              className="aspect-[9/16] overflow-hidden rounded-lg shadow-md"
              variants={fadeIn}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                width={500}
                height={300}
                style={{ width: "100%", height: "100%" }} // Responsive with aspect ratio maintained
                src={wallpaper.src}
                alt={`Mobile AI Wallpaper ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href={"/explore"}>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              {t("view-full-gallery")}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default GalleryPreview;
