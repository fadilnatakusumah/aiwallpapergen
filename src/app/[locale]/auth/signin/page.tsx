// app/auth/error/page.tsx
"use client";

import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/navigation";

export default function ErrorSignin() {
  const searchParams = useSearchParams();
  const errorType = searchParams.get("error");

  let errorMessage: ReactNode = "An unknown error occurred.";

  // Customize your error messages based on error type
  if (errorType === "OAuthCallbackError") {
    errorMessage = (
      <span>
        Sign in was cancelled or encountered an issue. <br />
        Please try again.
      </span>
    );
  } else if (errorType === "AccessDenied") {
    errorMessage = "You do not have permission to sign in.";
  }
  // Add more cases as needed

  return (
    <>
      <div className="flex h-screen min-h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="w-full max-w-3xl text-center">
          {/* Animated 404 text */}
          <motion.h1
            className="mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-8xl font-bold text-transparent md:text-9xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            Sorry!
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="mb-6 text-2xl font-semibold text-gray-800 md:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Authentication Error
          </motion.h2>

          {/* Message */}
          <motion.p
            className="mx-auto mb-8 max-w-md text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {errorMessage}
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/auth">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Home className="mr-2 h-4 w-4" />
                Return Login Page
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
