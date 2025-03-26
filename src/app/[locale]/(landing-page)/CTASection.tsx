"use client";

import { motion } from "framer-motion";

import { Button } from "~/components/ui/button";
import useMyTranslation from "~/hooks/translation";
import { Link } from "~/i18n/navigation";

function CTASection() {
  const { t } = useMyTranslation("landing-page.cta-section");

  return (
    <section className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-gray-700">
            {t("description")}
          </p>
          <Link href={"/auth"}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white hover:opacity-90"
            >
              {t("get-started-now")}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
