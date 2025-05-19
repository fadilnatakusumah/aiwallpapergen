// app/wallpapers/[id]/route.ts
import { NextResponse } from "next/server";

import { db } from "~/server/db";
import { redis } from "~/server/redis";
import { generateCDNURLWallpaper } from "~/server/utils/string";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Image ID is required" },
      { status: 400 },
    );
  }

  try {
    // Check Redis cache for the custom URL
    // const cachedUrl = await redis.get<string>(`wallpaper:${id}`);
    // if (cachedUrl) {
    //   return NextResponse.redirect(cachedUrl);
    // }

    // If not cached, fetch the wallpaper record from the database
    const wallpaper = await db.wallpaper.findUnique({
      where: { id },
    });

    if (!wallpaper) {
      return NextResponse.json(
        { error: "Wallpaper not found" },
        { status: 404 },
      );
    }

    // Construct the new custom domain URL
    // Assuming your file naming is based on the wallpaper.id and images are stored as .jpg
    const customUrl = generateCDNURLWallpaper(wallpaper);

    // Cache the custom URL in Redis for 24 hours
    // await redis.set(`wallpaper:${id}`, customUrl, { ex: 60 * 60 * 24 });

    return NextResponse.redirect(customUrl);
  } catch (error) {
    console.error("Error serving wallpaper:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// async function proxyImage(
//   url: string,
//   fallbackUrl?: string,
// ): Promise<Response> {
//   // Try fetching the image from the custom URL first.
//   let response = await fetch(url);

//   // If the response status is 403 (Forbidden), fall back to the original S3 URL.
//   if (response.status === 403 && fallbackUrl) {
//     console.warn("Custom URL returned 403, falling back to original S3 URL.");
//     response = await fetch(fallbackUrl);
//   }

//   if (!response.ok) {
//     console.error(
//       "Failed to fetch image from custom domain:",
//       response.statusText,
//     );
//     return NextResponse.json(
//       { error: "Failed to load image" },
//       { status: 500 },
//     );
//   }

//   // Convert the fetched response to an arrayBuffer
//   const imageBuffer = await response.arrayBuffer();

//   // Return the image response with caching headers
//   return new NextResponse(imageBuffer, {
//     status: 200,
//     headers: {
//       "Content-Type": response.headers.get("Content-Type") || "image/jpeg",
//       "Cache-Control": "public, max-age=31536000, immutable",
//     },
//   });
// }

// import { NextResponse } from "next/server";
// import { db } from "~/server/db";

// export async function GET(
//   _req: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   const { id } = await params;

//   if (!id) {
//     return NextResponse.json(
//       { error: "Image ID is required" },
//       { status: 400 },
//     );
//   }

//   try {
//     const wallpaper = await db.wallpaper.findUnique({
//       where: { id },
//     });

//     if (!wallpaper) {
//       return NextResponse.json(
//         { error: "Wallpaper not found" },
//         { status: 404 },
//       );
//     }

//     const response = await fetch(wallpaper.url);

//     if (!response.ok) {
//       console.error("Failed to fetch S3 image:", response.statusText);
//       return NextResponse.json(
//         { error: "Failed to load image" },
//         { status: 500 },
//       );
//     }

//     const imageBuffer = await response.arrayBuffer();

//     return new NextResponse(imageBuffer, {
//       status: 200,
//       headers: {
//         "Content-Type": response.headers.get("Content-Type") ?? "image/jpeg",
//         "Content-Length":
//           response.headers.get("Content-Length") ?? `${imageBuffer.byteLength}`,
//         // "Cache-Control": "public, max-age=31536000, immutable",
//       },
//     });
//   } catch (error) {
//     console.log("🚀 ~ error:", error);
//     console.error("Error serving wallpaper:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import { db } from "~/server/db"; // Assuming your db connection is here

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   const { id } = await params;

//   if (!id) {
//     return NextResponse.json(
//       { error: "Image ID is required" },
//       { status: 400 },
//     );
//   }

//   try {
//     const wallpaper = await db.wallpaper.findUnique({
//       where: { id },
//     });

//     if (!wallpaper) {
//       return NextResponse.json(
//         { error: "Wallpaper not found" },
//         { status: 404 },
//       );
//     }
//     let response = await fetch(wallpaper.url);
//     // console.log("🚀 ~ response:", response);

//     const imageBuffer = await response.arrayBuffer();
//     console.log("🚀 ~ imageBuffer:", imageBuffer);

//     // Redirect to the S3 image URL
//     // return NextResponse.redirect(wallpaper.url);
//   } catch (error) {
//     console.error("Failed to fetch wallpaper:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 },
//     );
//   }
// }
