"use client";

import { motion } from "framer-motion";

import PricingCard from "~/components/pricing-card";

import { fadeIn, staggerContainer } from "./const";

function PricingSection() {
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
            Choose Your Plan
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-gray-600">
            Select the perfect plan for your wallpaper needs, from casual use to
            professional creation.
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
              title="Free"
              price="$0"
              description="Perfect for casual users"
              features={[
                "15 credits after first time registration",
                "Standard resolution",
                "Basic customization",
                "No Ads",
              ]}
              buttonText="Get Started"
              buttonVariant="default"
              highlighted={true}
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <PricingCard
              title="Premium"
              price="$--"
              period="per month"
              description="For wallpaper enthusiasts"
              features={[
                "-",
                // "50 wallpapers per month",
                // "High resolution",
                // "Advanced customization",
                // "Ad-free experience",
                // "Priority generation",
              ]}
              buttonText="Subscribe Now"
              buttonVariant="outline"
              // highlighted={true}
              disabled
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <PricingCard
              disabled
              title="Unlimited"
              price="$--"
              period="per month"
              description="For professionals & creators"
              features={[
                "-",
                // "Unlimited wallpapers",
                // "Ultra-high resolution",
                // "Full customization suite",
                // "Commercial usage rights",
                // "API access",
                // "Priority support",
              ]}
              buttonText="Go Unlimited"
              buttonVariant="outline"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default PricingSection;
