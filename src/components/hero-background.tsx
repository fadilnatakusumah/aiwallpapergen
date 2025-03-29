"use client";
import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div>

      {/* Animated gradient blobs using Framer Motion */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-pink-200 to-purple-200 blur-[100px]"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-200 to-cyan-200 blur-[100px]"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/3 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-purple-200 to-blue-200 blur-[100px]"
        animate={{
          x: [0, 80, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/3 h-[450px] w-[450px] rounded-full bg-gradient-to-r from-cyan-200 to-pink-200 blur-[100px]"
        animate={{
          x: [0, -80, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
