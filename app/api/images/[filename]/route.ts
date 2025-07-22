import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// ✅ Correct type of second argument
export async function GET(
  req: NextRequest,
  context: { params: { filename: string } }
) {
  const { filename } = context.params;

  // ✅ Optional: Use different folder based on environment
  const baseDir =
    process.env.NODE_ENV === "development"
      ? path.join(process.cwd(), "public/uploads")
      : "/tmp/assets"; // Vercel allows only /tmp

  const filePath = path.join(baseDir, filename);

  try {
    const fileBuffer = await fs.readFile(filePath);

    const ext = path.extname(filename).toLowerCase();
    const mimeType =
      ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
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