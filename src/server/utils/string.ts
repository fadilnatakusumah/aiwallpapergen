import { type Wallpaper } from "@prisma/client";
import { env } from "~/env";

export function generateCDNURLWallpaper(wallpaper: Wallpaper) {
  const url = wallpaper.url.split("/");
  const lastTwo = url.slice(-2).join("/");

  // In production, use your custom domain (e.g., through Cloudflare)
  return `${env.CLOUDFLARE_IMAGE_CDN}/wallpapers/${lastTwo}`;
}

export function generateAccessURLWallpaper(wallpaperID: string) {
  return `${env.NEXTAUTH_URL}/wallpapers/${wallpaperID}`;
}
// https://ai-wallpaper-generator.s3.ap-southeast-2.amazonaws.com/wallpapers/cm85iuppp0000yqb8dse5fcxz/1741769651811.jpg
