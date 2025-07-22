import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET(
  req: NextRequest,
  context: any // 👈 Easiest fix — no typing issue
) {
  const { filename } = context.params;

  const baseDir =
    process.env.NODE_ENV === "development"
      ? path.join(process.cwd(), "public/uploads")
      : "/tmp/assets";

  const filePath = path.join(baseDir, filename);

  try {
    const fileBuffer = await fs.readFile(filePath);

    const ext = path.extname(filename).toLowerCase();
    const mimeType =
      ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".webp"
        ? "image/webp"
        : "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("Error loading image:", err);
    return new NextResponse("Image not found", { status: 404 });
  }
}
