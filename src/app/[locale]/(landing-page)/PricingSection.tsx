"use client";

import { motion } from "framer-motion";

import PricingCard from "~/components/pricing-card";

import { fadeIn, staggerContainer } from "./const";
import useMyTranslation from "~/i18n/translation-client";

function PricingSection() {
  const { t } = useMyTranslation("landing-page.pricing-section");

  return (
    <section id="pricing" className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-center text-3xl font-semibold text-gray-900 md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-gray-600">
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn}>
            <PricingCard
              title={t("pricing-free.title")}
              price="$0"
              description={t("pricing-free.description")}
              features={[
                t("pricing-free.feature-1"),
                t("pricing-free.feature-2"),
                t("pricing-free.feature-3"),
                t("pricing-free.feature-4"),
              ]}
              buttonText={t("pricing-free.button-text")}
              buttonVariant="default"
              highlighted={true}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <PricingCard
              title={t("pricing-premium.title")}
              price="$--"
              period={t("pricing-premium.period")}
              description={t("pricing-premium.description")}
              features={[
                "-",
                // "50 wallpapers per month",
                // "High resolution",
                // "Advanced customization",
                // "Ad-free experience",
                // "Priority generation",
              ]}
              buttonText={t("pricing-premium.button-text")}
              buttonVariant="outline"
              // highlighted={true}
              disabled
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <PricingCard
              title={t("pricing-unlimited.title")}
              price="$--"
              period={t("pricing-unlimited.period")}
              description={t("pricing-unlimited.description")}
              features={[
                "-",
                // "Unlimited wallpapers",
                // "Ultra-high resolution",
                // "Full customization suite",
                // "Commercial usage rights",
                // "API access",
                // "Priority support",
              ]}
              buttonText={t("pricing-unlimited.button-text")}
              buttonVariant="outline"
              disabled
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;
