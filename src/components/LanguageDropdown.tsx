"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState, useTransition } from "react";
import nProgress from "nprogress";

import Flag from "react-world-flags";
import { Button } from "./ui/button";

import { usePathname, useRouter } from "~/i18n/navigation";
import { cn } from "~/lib/utils";

type Language = {
  code: string;
  name: string;
  flag: string;
  flagCode: string;
};

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", flagCode: "GB" },
  { code: "id", name: "Indonesia", flag: " 🇮🇩", flagCode: "ID" },
  // { code: "es", name: "Español", flag: "🇪🇸" },
  // { code: "fr", name: "Français", flag: "🇫🇷" },
  // { code: "de", name: "Deutsch", flag: "🇩🇪" },
  // { code: "it", name: "Italiano", flag: "🇮🇹" },
  // { code: "ja", name: "日本語", flag: "🇯🇵" },
];

interface LanguageDropdownProps {
  initialLanguage?: string;
  onLanguageChange?: (language: Language) => void;
  className?: string;
}

export default function LanguageDropdown({
  onLanguageChange,
  className,
}: LanguageDropdownProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find((lang) => lang.code === locale) ?? languages[0]!,
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
    startTransition(() => {
      router.replace(pathname, {
        locale: language.code,
      });
    });
    router.refresh();
    onLanguageChange?.(language);
  };

  useEffect(() => {
    if (isPending) {
      nProgress.start();
    } else {
      nProgress.done();
    }
  }, [isPending]);

  return (
    <div
      ref={dropdownRef}
      className={cn("relative block w-min text-left", className)}
    >
      {/* <FlagPack code="US" size="m" />
      <FlagPack code="CA" size="m" /> */}
      {/* <span className="flag-icon flag-icon-us" /> */}
      {/* Dropdown trigger button */}
      <Button
        type="button"
        className="border-shadow-sm flex items-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        // className="items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* <span className="flex items-center gap-2">
          {/* <pre>{JSON.stringify({ selectedLanguage }, null, 2)}</pre> */}
        {/* <span>

</span> */}
        {/* </span> */}
        <Flag
          className="inline w-5"
          code={selectedLanguage.flagCode}
          fallback={<span>Unknown</span>}
        />
        {/* <span className="text-lg">
          <ReactCountryFlag countryCode={selectedLanguage.flagCode} />
        </span> */}
        {/* <Flag
          className="h-5 w-5"
          code={selectedLanguage.flagCode}
          fallback={<span>Unknown</span>}
        /> */}
        {selectedLanguage.code.toUpperCase()}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          // className="md:ml-2"
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
            className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:w-full"
            style={{ transformOrigin: "top" }}
          >
            <div
              // className="relative w-full py-1"
              style={{ scrollbarWidth: "thin" }}
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  className={cn(
                    // "bg-white",
                    "flex w-full items-center justify-between gap-2 overflow-x-visible whitespace-nowrap px-4 py-2 text-right text-sm hover:bg-gray-100",
                    selectedLanguage.code === language.code
                      ? "bg-gray-200 text-primary"
                      : "text-gray-700",
                  )}
                  onClick={() => handleLanguageSelect(language)}
                >
                  {/* <span className="flex gap-2 whitespace-nowrap">
                   */}
                  {/* <Flag code={language.code} size={"m"} /> */}
                  {/* <span className="text-lg leading-none">
                      <ReactCountryFlag countryCode={language.flagCode} />
                    </span> */}
                  {/* <span className="mr-2 text-base">{language.flag}</span> */}
                  {/* 
                  </span> */}

                  <div className="flex w-full items-center justify-start gap-2 whitespace-nowrap text-start">
                    <Flag
                      className="inline w-5"
                      code={language.flagCode}
                      fallback={<span>Unknown</span>}
                    />
                    <span className="flex-grow">
                      {language.code.toUpperCase()}
                    </span>
                  </div>
                  {/* {selectedLanguage.code === language.code && (
                    <Check className="ml-4 h-4 w-4 text-primary" />
                  )} */}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
