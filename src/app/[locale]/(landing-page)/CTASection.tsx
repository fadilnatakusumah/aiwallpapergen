"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "~/components/ui/button";

function CTASection() {
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
            Ready to Transform Your Screens?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-gray-700">
            Join thousands of users creating stunning AI-generated wallpapers
            for their devices.
          </p>
          <Link href={"/auth"}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white hover:opacity-90"
            >
              Get Started Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
