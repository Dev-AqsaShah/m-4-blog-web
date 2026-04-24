import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import mongoose from "mongoose";
import BlogModel from "@/lib/models/BlogModel";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGO_URI;
  if (!MONGODB_URI) throw new Error("MongoDB URI is not defined in environment variables");
  if (mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(MONGODB_URI, { dbName: "blogDatabase" });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

const isVercel = process.env.VERCEL === "1";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

async function saveImage(image: File): Promise<string> {
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const timestamp = Date.now();
  const safeName = image.name.replace(/\s+/g, "_");

  if (isVercel) {
    const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blogs", public_id: `${timestamp}_${safeName}` },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve(result as { secure_url: string });
        }
      );
      stream.end(buffer);
    });
    return uploadResult.secure_url;
  } else {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });
    const imageName = `${timestamp}_${safeName}`;
    await writeFile(path.join(uploadDir, imageName), buffer);
    return `/uploads/${imageName}`;
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("id");

    if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
      const blogs = await BlogModel.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, blogs });
    }

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

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

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const formData = await request.formData();
    const blogId = formData.get("id") as string;

    if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
      return NextResponse.json({ success: false, error: "Invalid or missing blog ID" }, { status: 400 });
    }

    const existingBlog = await BlogModel.findById(blogId);
    if (!existingBlog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    let imageUrl = existingBlog.image;
    const image = formData.get("image") as File | null;
    if (image && image.size > 0) {
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
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, error: "Failed to update blog" }, { status: 500 });
  }
}

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
    console.error("Error deleting blog:", error);
    return NextResponse.json({ success: false, error: "Failed to delete blog" }, { status: 500 });
  }
}
