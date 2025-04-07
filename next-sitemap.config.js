/** @type {import('next-sitemap').IConfig} */
const config = {
  // The base URL of your site; ensure this is set correctly in production.
  siteUrl: process.env.NEXTAUTH_URL || "https://aiwallpapergen.com",

  // Generate a robots.txt file along with the sitemap.
  generateRobotsTxt: true,

  // Maximum URLs per sitemap file.
  sitemapSize: 7000,

  // Default change frequency for all pages.
  changefreq: "daily",

  // Default priority for all pages.
  priority: 0.7,

  // Exclude these routes from the sitemap.
  // exclude: [
  //   "/api/*",
  //   "/auth/*",
  //   "/c/*",
  //   "/explore",
  //   "/my-collections",
  //   "/terms-of-service",
  //   "/privacy-policy",
  //   "/status",
  // ],

  // Manually add key static paths that might not be auto-detected,
  // especially useful if using Next.js App Router.
  additionalPaths: async (config) => {
    return [
      { loc: `${config.siteUrl}/` },
      { loc: `${config.siteUrl}/contact-us` },
      // Add additional pages if needed.
    ];
  },
  robotsTxtOptions: {
    policies: [
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
        ],
      },

      {
        userAgent: "Applebot",
        disallow: ["/"],
      },
      {
        userAgent: "Bingbot",
        disallow: ["/"],
      },
    ],
  },
};

export default config;
