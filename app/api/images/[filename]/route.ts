// import { NextRequest, NextResponse } from "next/server";
// import path from "path";
// import { promises as fs } from "fs";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { filename: string } }
// ) {
//   const { filename } = params;

//   const baseDir =
//     process.env.NODE_ENV === "development"
//       ? path.join(process.cwd(), "public/uploads")
//       : "/tmp/assets";

//   const filePath = path.join(baseDir, filename);

//   try {
//     const fileBuffer = await fs.readFile(filePath);

//     const ext = path.extname(filename).toLowerCase();
//     const mimeType =
//       ext === ".png"
//         ? "image/png"
//         : ext === ".jpg" || ext === ".jpeg"
//         ? "image/jpeg"
//         : ext === ".webp"
//         ? "image/webp"
//         : "application/octet-stream";

//     return new NextResponse(fileBuffer, {
//       headers: {
//         "Content-Type": mimeType,
//         "Content-Disposition": `inline; filename="${filename}"`,
//       },
//     });
//   } catch (err) {
//     console.error("Error loading image:", err);
//     return new NextResponse("Image not found", { status: 404 });
//   }
// }




import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  const { filename } = params;
  const filePath = path.join(process.cwd(), "uploads", filename);

  try {
    const fileBuffer = fs.readFileSync(filePath);

    // ✅ Convert Node.js Buffer -> Uint8Array
    const uint8Array = new Uint8Array(fileBuffer);

    return new Response(uint8Array, {
      headers: { "Content-Type": "image/jpeg" },
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response(JSON.stringify({ error: "File not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
}
