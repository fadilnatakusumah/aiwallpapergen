/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXTAUTH_URL || "https://aiwallpapergen.com",
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  changefreq: "daily",
  priority: 0.7,
  exclude: [
    "/api/*",
    "/auth/*",
    "/c/*",
    "/explore",
    "/my-collections",
    "/terms-of-service",
    "/privacy-policy",
    "/status",
  ],
  // ...other options
};

export default config;
