import { NextResponse, type NextRequest } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// Correctly typed dynamic route function
export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  const { filename } = params;

  // Use a safe path for Vercel (runtime-writable)
  const filePath = path.join("/tmp/assets", filename);

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
  } catch {
    return new NextResponse("Image not found", { status: 404 });
  }
}
