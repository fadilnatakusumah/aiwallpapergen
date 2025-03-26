"use client";

import { motion } from "framer-motion";
import { Palette, Sparkles, Zap } from "lucide-react";

import FeatureCard from "~/components/feature-card";

import useMyTranslation from "~/hooks/translation";
import { fadeIn, staggerContainer } from "./const";

function FeaturesSection() {
  const { t } = useMyTranslation("landing-page.features-section");

  return (
    <section id="features" className="bg-white py-20">
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

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn}>
            <FeatureCard
              icon={<Sparkles className="h-6 w-6 text-pink-500" />}
              title={t("feature-1.title")}
              description={t("feature-1.description")}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <FeatureCard
              icon={<Palette className="h-6 w-6 text-purple-500" />}
              title={t("feature-2.title")}
              description={t("feature-2.description")}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-cyan-500" />}
              title={t("feature-3.title")}
              description={t("feature-3.description")}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
