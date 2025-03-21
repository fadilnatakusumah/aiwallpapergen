import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Image ID is required" },
      { status: 400 },
    );
  }

  try {
    const wallpaper = await db.wallpaper.findUnique({
      where: { id },
    });

    if (!wallpaper) {
      return NextResponse.json(
        { error: "Wallpaper not found" },
        { status: 404 },
      );
    }

    const response = await fetch(wallpaper.url);

    if (!response.ok) {
      console.error("Failed to fetch S3 image:", response.statusText);
      return NextResponse.json(
        { error: "Failed to load image" },
        { status: 500 },
      );
    }

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") ?? "image/jpeg",
        "Content-Length":
          response.headers.get("Content-Length") ?? `${imageBuffer.byteLength}`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving wallpaper:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
