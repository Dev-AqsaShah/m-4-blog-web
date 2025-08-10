import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

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

    if (isVercel) {
      // ✅ If already a full Cloudinary URL, just redirect to it
      if (filename.startsWith("http")) {
        return NextResponse.redirect(filename);
      }

      // Otherwise, build Cloudinary URL from public_id
      const cloudinaryUrl = cloudinary.url(filename, { secure: true });
      return NextResponse.redirect(cloudinaryUrl);
    }

    // Local mode — serve from public/uploads
    const filePath = path.join(process.cwd(), "public/uploads", filename);

    if (!existsSync(filePath)) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const fileBuffer = await readFile(filePath);
    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";

    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".webp") contentType = "image/webp";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
