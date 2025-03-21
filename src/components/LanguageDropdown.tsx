"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "./ui/button";

import { cn } from "~/lib/utils";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];

interface LanguageDropdownProps {
  initialLanguage?: string;
  onLanguageChange?: (language: Language) => void;
  className?: string;
}

export default function LanguageDropdown({
  initialLanguage = "en",
  onLanguageChange,
  className,
}: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find((lang) => lang.code === initialLanguage) || languages[0]!,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    onLanguageChange?.(language);
  };

  return (
    <div
      ref={dropdownRef}
      className={cn("relative inline-block text-left", className)}
    >
      {/* Dropdown trigger button */}
      <Button
        type="button"
        className="inline-flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="flex items-center">
          <span className="text-base md:mr-2">{selectedLanguage.flag}</span>
          <span className="hidden md:inline-block">
            {selectedLanguage.name}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="md:ml-2"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </Button>

      {/* Dropdown menu */}
      <AnimatePresence key={"language"} mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute right-0 z-10 mt-2 md:w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            style={{ transformOrigin: "top" }}
          >
            <div
              className="max-h-60 w-full overflow-auto py-1"
              style={{ scrollbarWidth: "thin" }}
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={cn(
                    "flex items-center px-4 py-2 text-left text-sm hover:bg-gray-100",
                    selectedLanguage.code === language.code
                      ? "bg-gray-50 text-primary"
                      : "text-gray-700",
                  )}
                  onClick={() => handleLanguageSelect(language)}
                >
                  <span className="mr-2 text-base">{language.flag}</span>
                  <span className="flex-grow">{language.name}</span>
                  {selectedLanguage.code === language.code && (
                    <Check className="ml-1 h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
