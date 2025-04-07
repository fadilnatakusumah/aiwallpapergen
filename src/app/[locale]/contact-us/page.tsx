import { Home } from "lucide-react";
import { type Metadata } from "next";

import MotionWrapper from "~/components/MotionWrapper";
import { Button } from "~/components/ui/button";
import { Link } from "~/i18n/navigation";
import LanguageDropdown from "~/components/LanguageDropdown";
import { getMyTranslation } from "~/i18n/translation-server";

export const metadata: Metadata = {
  title: "Contact Us | AI Wallpaper Gen",
  description:
    "Discover the ultimate AI-powered wallpaper generator. Create, customize, and share unique wallpapers generated with cutting-edge AI technology. Perfect for desktop and mobile backgrounds.",
  keywords: [
    "AI wallpaper",
    "wallpaper generator",
    "DALL-E",
    "AI art",
    "digital art",
    "creative wallpapers",
    "AI design",
  ],
  openGraph: {
    title: "AI Wallpaper Generator",
    description:
      "Unleash your creativity with our AI-powered wallpaper generator. Make unique, stunning wallpapers perfect for every device.",
    url: "https://aiwallpapergen.com",
    siteName: "AI Wallpaper Generator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Wallpaper Generator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@dilnatakusumah", // Replace with your Twitter handle if available
    title: "AI Wallpaper Generator",
    description:
      "Create, customize, and share stunning AI-generated wallpapers. Perfect for every device!",
    images: ["/og-image.jpg"],
  },
};

export default async function ContactUs() {
  // Ensure that the incoming `locale` is valid
  // console.log("🚀 ~ params:", params);
  // console.log("🚀 ~ locale:", locale);
  // const locale = (await getLocale()) ?? localeParams;
  // console.log("🚀 ~ params:", await params);

  // const [isRepairing, setIsRepairing] = useState(false);
  // const [repairProgress, setRepairProgress] = useState(0);

  // // Simulate the repair process when the button is clicked
  // useEffect(() => {
  //   if (isRepairing) {
  //     const interval = setInterval(() => {
  //       setRepairProgress((prev) => {
  //         const newProgress = prev + 1;
  //         if (newProgress >= 100) {
  //           setIsRepairing(false);
  //           clearInterval(interval);
  //           return 100;
  //         }
  //         return newProgress;
  //       });
  //     }, 30);

  //     return () => clearInterval(interval);
  //   }
  // }, [isRepairing]);

  // Generate glitch positions for the animation
  // const glitchPositions = Array.from({ length: 15 }, () => ({
  //   x: Math.random() * 100,
  //   y: Math.random() * 100,
  //   width: 5 + Math.random() * 20,
  //   height: 5 + Math.random() * 20,
  // }));
  const { t } = await getMyTranslation("contact-us");

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <div className="w-full max-w-3xl pt-5 text-center">
          {/* Animated 404 text */}
          <MotionWrapper
            tag="h1"
            className="mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-3xl font-bold text-transparent md:text-7xl"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            {/* Contact Us */}
            {t("title")}
          </MotionWrapper>

          {/* Subtitle */}
          <MotionWrapper
            tag="h2"
            className="mb-6 text-xl text-gray-800 md:text-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("description")}
            {/* We'd love to hear from you! Whether you have questions about our AI
            Wallpaper Gen, need technical support, or want to share your amazing
            creations, our team is here to help. */}
          </MotionWrapper>
          <MotionWrapper
            tag="h3"
            className="text-md mb-6 text-gray-800 md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {`aiwallpapergen@gmail.com`}
            {/* We'd love to hear from you! Whether you have questions about our AI
            Wallpaper Gen, need technical support, or want to share your amazing
            creations, our team is here to help. */}
          </MotionWrapper>

          {/* Action buttons */}
          <MotionWrapper
            className="flex flex-col justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <LanguageDropdown />
            <Link href="/">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                <Home className="mr-2 h-4 w-4" />
                {t("return-home")}
              </Button>
            </Link>
          </MotionWrapper>
        </div>
      </div>
    </>
  );
}
