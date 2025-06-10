import type { MetadataRoute } from "next";
import { env } from "~/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.NEXTAUTH_URL || "https://aiwallpapergen.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      alternates: {
        languages: {
          id: `${baseUrl}/id`,
        },
      },
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      alternates: {
        languages: {
          id: `${baseUrl}/id/contact-us`,
        },
      },
    },
  ];
}
