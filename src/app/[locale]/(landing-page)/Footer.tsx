"use client";

import { Github, Globe, Instagram } from "lucide-react";
import Image from "next/image";

import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/navigation";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 flex items-center gap-2 md:mb-0">
            <Image
              className="inline-block"
              alt="aiwallpapergen.com"
              height={24}
              width={24}
              src="/og-image.png"
            />{" "}
            <div className="bold inline-block overflow-hidden text-ellipsis whitespace-nowrap px-2 text-lg">
              AI{" "}
              <span>
                <strong className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text font-bold text-transparent">
                  Wallpaper
                </strong>{" "}
                Gen
              </span>
            </div>
          </div>
          <div className="mb-6 flex flex-wrap justify-center gap-6 md:mb-0">
            <Link
              href="#features"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              Pricing
            </Link>
            <Link
              href="#gallery"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              Gallery
            </Link>
            {/* <Link
              href="#"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              FAQ
            </Link>
            <Link
              href="#"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-gray-600 transition-colors hover:text-gray-900"
            >
              Terms
            </Link> */}
          </div>
          <div className="flex gap-4">
            <Link
              title="Website | fadilnatakusumah"
              href="https://ffadilnatakusumah.com"
              target="_blank"
              aria-label="Website"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Globe size={20} />
              </Button>
            </Link>
            <Link
              title="Instagram | fadilnatakusumah"
              href="https://instagram.com/fadilnatakusumah"
              target="_blank"
              aria-label="Instagram"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Instagram size={20} />
              </Button>
            </Link>
            <Link
              href="https://github.com/fadilnatakusumah"
              title="Github | fadilnatakusumah"
              target="_blank"
              aria-label="GitHub"
            >
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <Github size={20} />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} WallpaperAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
