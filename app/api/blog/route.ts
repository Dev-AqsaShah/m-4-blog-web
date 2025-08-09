import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
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
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, { dbName: "blogDatabase" });
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

// Detect environment
const isVercel = process.env.VERCEL === "1";

// Helper to save image in correct place and return API URL
async function saveImage(image: File): Promise<string> {
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const timestamp = Date.now();
  const imageName = `${timestamp}_${image.name.replace(/\s+/g, "_")}`;
  let imagePath: string;

  if (isVercel) {
    const tmpDir = "/tmp/assets";
    if (!existsSync(tmpDir)) await mkdir(tmpDir, { recursive: true });
    imagePath = path.join(tmpDir, imageName);
  } else {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });
    imagePath = path.join(uploadDir, imageName);
  }

  await writeFile(imagePath, buffer);

  // Always return same URL format
  return `/api/images/${imageName}`;
}

// 🟢 GET: Fetch all or by ID
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id");

    if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ success: true, blogs });
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// 🟠 POST: Create a new blog
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const formData = await request.formData();
    const image = formData.get("image") as File | null;

    if (!image) {
      return NextResponse.json({ success: false, error: "Image file is required" }, { status: 400 });
    }

    const imageUrl = await saveImage(image);

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      authorImage: formData.get("authorImage"),
      image: imageUrl,
    };

    await BlogModel.create(blogData);
    return NextResponse.json({ success: true, msg: "Blog Added", imageUrl });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: "Failed to process blog post" }, { status: 500 });
  }
}

// 🔴 DELETE: Remove a blog
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id");

    if (!blogId) {
      return NextResponse.json({ success: false, error: "Missing blog ID" }, { status: 400 });
    }

    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, msg: "Blog deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting blog:", error);
    return NextResponse.json({ success: false, error: "Failed to delete blog" }, { status: 500 });
  }
}

// 🟡 PUT: Update a blog
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const formData = await request.formData();
    const blogId = formData.get("id");

    if (!blogId || !mongoose.Types.ObjectId.isValid(blogId as string)) {
      return NextResponse.json({ success: false, error: "Invalid or missing blog ID" }, { status: 400 });
    }

    const existingBlog = await BlogModel.findById(blogId);
    if (!existingBlog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    let imageUrl = existingBlog.image;
    const image = formData.get("image") as File | null;

    if (image) {
      imageUrl = await saveImage(image);
    }

    const updatedData = {
      title: formData.get("title") || existingBlog.title,
      description: formData.get("description") || existingBlog.description,
      category: formData.get("category") || existingBlog.category,
      author: formData.get("author") || existingBlog.author,
      authorImage: formData.get("authorImage") || existingBlog.authorImage,
      image: imageUrl,
    };

    await BlogModel.findByIdAndUpdate(blogId, updatedData, { new: true });

    return NextResponse.json({ success: true, msg: "Blog updated successfully" });
  } catch (error) {
    console.error("❌ Error updating blog:", error);
    return NextResponse.json({ success: false, error: "Failed to update blog" }, { status: 500 });
  }
}
