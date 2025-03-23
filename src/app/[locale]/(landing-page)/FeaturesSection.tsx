"use client";

import { motion } from "framer-motion";
import { Palette, Sparkles, Zap } from "lucide-react";

import FeatureCard from "~/components/feature-card";

import { fadeIn, staggerContainer } from "./const";
import { T, useTranslate } from "@tolgee/react";

function FeaturesSection() {
  const { t } = useTranslate();

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
          <T keyName={"landing-page.features-section.title"} />
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
              title={t("landing-page.features-section.feature-1.title")}
              description="Our advanced AI models create unique wallpapers based on your preferences and prompts."
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <FeatureCard
              icon={<Palette className="h-6 w-6 text-purple-500" />}
              title="Endless Customization"
              description="Adjust colors, styles, and themes to match your personality and device aesthetics."
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-cyan-500" />}
              title="Instant Creation"
              description="Generate high-resolution wallpapers in seconds, ready to download and use."
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;
