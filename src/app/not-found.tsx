"use client";

import { motion } from "framer-motion";
import { GeistSans } from "geist/font/sans";
import { Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "~/components/ui/button";

export default function NotFound() {
  const [isRepairing, setIsRepairing] = useState(false);
  const [repairProgress, setRepairProgress] = useState(0);

  // Simulate the repair process when the button is clicked
  useEffect(() => {
    if (isRepairing) {
      const interval = setInterval(() => {
        setRepairProgress((prev) => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setIsRepairing(false);
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 30);

      return () => clearInterval(interval);
    }
  }, [isRepairing]);

  // Generate glitch positions for the animation
  const glitchPositions = Array.from({ length: 15 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    width: 5 + Math.random() * 20,
    height: 5 + Math.random() * 20,
  }));

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="h-screen w-screen">
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
          <div className="w-full max-w-3xl text-center">
            {/* Animated 404 text */}
            <motion.h1
              className="mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-8xl font-bold text-transparent md:text-9xl"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              404
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              className="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Wallpaper Not Found
            </motion.h2>

            {/* Corrupted wallpaper visualization */}
            <motion.div
              className="relative mx-auto mb-8 aspect-[16/9] w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Base wallpaper image */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100" />

              {/* Glitch elements that disappear during repair */}
              {glitchPositions.map((pos, index) => (
                <motion.div
                  key={index}
                  className="absolute bg-gray-900/80"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    width: `${pos.width}%`,
                    height: `${pos.height}%`,
                  }}
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: isRepairing ? 0 : 1,
                    x: isRepairing ? [0, Math.random() * 10 - 5, 0] : 0,
                  }}
                  transition={{
                    opacity: { delay: index * 0.02, duration: 0.5 },
                    x: { repeat: Number.POSITIVE_INFINITY, duration: 0.2 },
                  }}
                />
              ))}

              {/* AI repair visualization */}
              {isRepairing && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              )}

              {/* Scanning line during repair */}
              {isRepairing && (
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
                  initial={{ top: "0%" }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              )}

              {/* Centered error icon or success icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {repairProgress === 100 ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring" }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                ) : !isRepairing ? (
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </motion.div>
                ) : null}
              </div>

              {/* Progress bar */}
              {isRepairing && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <motion.div
                      className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
                      initial={{ width: "0%" }}
                      animate={{ width: `${repairProgress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <div className="mt-1 text-center text-xs font-medium text-gray-700">
                    Repairing: {repairProgress}%
                  </div>
                </div>
              )}
            </motion.div>

            {/* Message */}
            <motion.p
              className="mx-auto mb-8 max-w-md text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {repairProgress === 100
                ? "Wallpaper repaired successfully! Ready to continue your journey."
                : "The wallpaper you're looking for seems to be corrupted or doesn't exist. Our AI can try to repair it, or you can return home."}
            </motion.p>

            {/* Action buttons */}
            <motion.div
              className="flex flex-col justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Return Home
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  );
}
