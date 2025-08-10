import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
  try {
    const { pathname } = new URL(request.url);
    const filename = decodeURIComponent(pathname.split("/").pop() || "");
    const isVercel = process.env.VERCEL === "1";

    if (!isVercel) {
      // Local: read from public/uploads
      const filePath = path.join(process.cwd(), "public/uploads", filename);

      if (!existsSync(filePath)) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
      }

      const fileBuffer = await readFile(filePath);
      return new NextResponse(fileBuffer, {
        headers: { "Content-Type": getContentType(filename) },
      });
    } else {
      // Vercel: fetch from Cloudinary
      const cloudUrl = cloudinary.url(`blog_uploads/${filename}`, {
        secure: true,
      });

      const res = await fetch(cloudUrl);
      if (!res.ok) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
      }
      const buffer = Buffer.from(await res.arrayBuffer());

      return new NextResponse(buffer, {
        headers: { "Content-Type": getContentType(filename) },
      });
    }
  } catch (error) {
    console.error("Error serving image:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function getContentType(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".gif") return "image/gif";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}
