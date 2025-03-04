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

    const image = formData.get("image") as File | null;
    let imageUrl = null;

    if (image) {
      const imageByteData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByteData);

      // ✅ Save file to /tmp directory (Vercel allows this)
      const assetsDir = "/tmp/assets";
      if (!existsSync(assetsDir)) {
        await mkdir(assetsDir, { recursive: true });
      }

      const timestamp = Date.now();
      const imageName = `${timestamp}_${image.name.replace(/\s+/g, "_")}`;
      const imagePath = path.join(assetsDir, imageName);

      await writeFile(imagePath, buffer);

      imageUrl = `/api/images/${imageName}`;
    } else {
      return NextResponse.json(
        { success: false, error: "Image file is required" },
        { status: 400 }
      );
    }

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
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to process blog post" },
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

  ////////////// Work for update blog

  // export async function PUT(request: NextRequest) {
  //   try {
  //     await connectDB();
  //     const formData = await request.formData();
  //     const blogId = formData.get("id");
  
  //     if (!blogId || !mongoose.Types.ObjectId.isValid(blogId as string)) {
  //       return NextResponse.json(
  //         { success: false, error: "Invalid or missing blog ID" },
  //         { status: 400 }
  //       );
  //     }
  
  //     const existingBlog = await BlogModel.findById(blogId);
  //     if (!existingBlog) {
  //       return NextResponse.json(
  //         { success: false, error: "Blog not found" },
  //         { status: 404 }
  //       );
  //     }
  
  //     const image = formData.get("image") as File | null;
  //     let imageUrl = existingBlog.image;
  
  //     if (image) {
  //       const imageByteData = await image.arrayBuffer();
  //       const buffer = Buffer.from(imageByteData);
  //       const assetsDir = "/tmp/assets";
  //       if (!existsSync(assetsDir)) {
  //         await mkdir(assetsDir, { recursive: true });
  //       }
  //       const timestamp = Date.now();
  //       const imageName = `${timestamp}_${image.name.replace(/\s+/g, "_")}`;
  //       const imagePath = path.join(assetsDir, imageName);
  //       await writeFile(imagePath, buffer);
  //       imageUrl = `/api/images/${imageName}`;
  //     }
  
  //     const updatedData = {
  //       title: formData.get("title") || existingBlog.title,
  //       description: formData.get("description") || existingBlog.description,
  //       category: formData.get("category") || existingBlog.category,
  //       author: formData.get("author") || existingBlog.author,
  //       authorImage: formData.get("authorImage") || existingBlog.authorImage,
  //       image: imageUrl,
  //     };
  
  //     await BlogModel.findByIdAndUpdate(blogId, updatedData, { new: true });
  
  //     return NextResponse.json({ success: true, msg: "Blog updated successfully" });
  //   } catch (error) {
  //     console.error("❌ Error updating blog:", error);
  //     return NextResponse.json(
  //       { success: false, error: "Failed to update blog" },
  //       { status: 500 }
  //     );
  //   }
  // }