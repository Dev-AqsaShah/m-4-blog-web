/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  context: { params: { filename: string } }
) {
  try {
    const { filename } = context.params;

    // File ka path banaye
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    // Check kare file exist karti hai ya nahi
    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ error: "File not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // File read kare
    const fileBuffer = fs.readFileSync(filePath);

    // Content type guess kare extension se
    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    if (ext === ".png") contentType = "image/png";

    return new Response(fileBuffer, {
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
