import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import mongoose from "mongoose";
import BlogModel from "@/lib/models/BlogModel";
import path from "path";

// 🔹 MongoDB Connection
const MONGODB_URI = process.env.MONGO_URI;
if (!MONGODB_URI) {
  throw new Error("MongoDB URI is not defined in environment variables");
}

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "blogDatabase",
    });
    console.log("✅ Database Connected");
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    throw new Error("Failed to connect to the database");
  }
};

// 🟢 GET: Fetch All Blogs or a Single Blog by ID
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id"); // Changed from 'let' to 'const'

    console.log("🔍 Received blogId:", blogId);

    // Prevent "NaN" from breaking the query
    if (!blogId || blogId === "NaN" || !mongoose.Types.ObjectId.isValid(blogId)) {
      console.warn("⚠️ Invalid or missing blog ID, fetching all blogs...");
      const blogs = await BlogModel.find({});
      return NextResponse.json({ success: true, blogs });
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 🟠 POST: Create a New Blog
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const formData = await request.formData();
    const timestamp = Date.now();

    const image = formData.get("image") as File | null;
    let imageUrl = null;

    if (image) {
      const imageByteData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByteData);

      // Define the destination folder: public/assets
      const assetsDir = path.join(process.cwd(), "public", "assets");
      const imageName = `${timestamp}_${image.name.replace(/\s+/g, "_")}`;
      const imagePath = path.join(assetsDir, imageName);

      // Write the file to public/assets
      await writeFile(imagePath, buffer);

      // Set the URL relative to the public folder (to be used on the client)
      imageUrl = `/assets/${imageName}`;
    } else {
      return NextResponse.json(
        { success: false, error: "Image file is required" },
        { status: 400 }
      );
    }

    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const category = formData.get("category")?.toString();
    const author = formData.get("author")?.toString();
    const authorImage = formData.get("authorImage")?.toString();

    if (!title || !description || !category || !author || !authorImage) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const blogData = {
      title,
      description,
      category,
      author,
      image: imageUrl,
      authorImage,
    };

    await BlogModel.create(blogData);
    console.log("✅ Blog Saved");

    return NextResponse.json({ success: true, msg: "Blog Added", imageUrl });
  } catch (error) {
    console.error("❌ Error processing blog post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process blog post" },
      { status: 500 }
    );
  }
}

// 🔴 DELETE: Remove a Blog by ID
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id");

    if (!blogId) {
      return NextResponse.json(
        { success: false, error: "Missing blog ID" },
        { status: 400 }
      );
    }

    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, msg: "Blog deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
