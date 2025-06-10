// app/robots.txt/route.ts
import { type MetadataRoute } from "next";
import { env } from "~/env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = env.NEXTAUTH_URL || "https://aiwallpapergen.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/*",
          "/auth/*",
          "/c/*",
          "/explore/",
          "/my-collections/",
          "/terms-of-service/",
          "/privacy-policy/",
          "/status/",
        ], // disallow sensitive routes
      },
      {
        userAgent: ["Applebot", "Bingbot"],
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
