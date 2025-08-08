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
import fs from "fs";

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  const filePath = path.join(process.cwd(), "public", "images", params.filename);

  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "image/jpeg", // yahan apne file type ka mime set karein
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response("File not found", { status: 404 });
  }
}
