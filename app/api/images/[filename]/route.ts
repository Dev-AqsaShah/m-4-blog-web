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



import { NextRequest } from "next/server";
import path from "path";
import { promises as fs } from "fs";

interface Params {
  filename: string;
}

function getMimeType(ext: string): string {
  switch (ext) {
    case ".png": return "image/png";
    case ".jpg":
    case ".jpeg": return "image/jpeg";
    case ".webp": return "image/webp";
    case ".gif": return "image/gif";
    case ".svg": return "image/svg+xml";
    default: return "application/octet-stream";
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Params }
) {
  const { filename } = params;

  // ✅ Fixed file path (uploads folder)
  const baseDir =
    process.env.NODE_ENV === "development"
      ? path.join(process.cwd(), "public/uploads")
      : "/tmp/assets";

  const filePath = path.join(baseDir, filename);

  try {
    // ✅ Async file read
    const fileBuffer = await fs.readFile(filePath);

    // ✅ Auto MIME type detection
    const ext = path.extname(filename).toLowerCase();
    const mimeType = getMimeType(ext);

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error("Error loading image:", err);
    return new Response("Image not found", { status: 404 });
  }
}
