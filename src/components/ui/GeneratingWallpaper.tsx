"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GeneratingWallpaperProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  generationSpeed?: number;
}

export const GeneratingWallpaper = ({
  width = "100%",
  height = "100%",
  borderRadius = "1rem",
  primaryColor = "#1a1a2e",
  secondaryColor = "#16213e",
  accentColor = "#0f3460",
  generationSpeed = 1,
}: GeneratingWallpaperProps) => {
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          width,
          height,
          borderRadius,
          backgroundColor: primaryColor,
        }}
      />
    );
  }

  // Generate random positions for the "particles"
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
  }));

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: primaryColor,
      }}
    >
      {/* Background gradient animation */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${accentColor}, ${secondaryColor})`,
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 8 / generationSpeed,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Horizontal scan lines */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.03) 2px,
            rgba(255, 255, 255, 0.03) 4px
          )`,
        }}
      />

      {/* Vertical scan line that moves across */}
      <motion.div
        className="absolute inset-y-0 w-[2px]"
        style={{
          background: `linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          )`,
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
        }}
        animate={{
          left: ["-10px", "calc(100% + 10px)"],
        }}
        transition={{
          duration: 2.5 / generationSpeed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Horizontal scan line that moves down */}
      <motion.div
        className="absolute inset-x-0 h-[2px]"
        style={{
          background: `linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          )`,
          boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
        }}
        animate={{
          top: ["-10px", "calc(100% + 10px)"],
        }}
        transition={{
          duration: 3 / generationSpeed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: 0.5,
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            boxShadow: "0 0 4px rgba(255, 255, 255, 0.7)",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 / generationSpeed,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Radial pulse */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundColor: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
        animate={{
          width: ["0%", "150%"],
          height: ["0%", "150%"],
          opacity: [0.8, 0],
        }}
        transition={{
          duration: 4 / generationSpeed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeOut",
        }}
      />

      {/* Generation progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-30">
        <motion.div
          className="h-full"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
          animate={{
            width: ["0%", "30%", "45%", "48%", "60%", "80%", "100%"],
          }}
          transition={{
            duration: 8 / generationSpeed,
            ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      </div>

      {/* "Generating" text */}
      <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-sm text-white opacity-70">
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          Generating Wallpaper
        </motion.span>
      </div>
    </div>
  );
};

export default GeneratingWallpaper;
