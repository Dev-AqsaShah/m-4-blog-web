import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import mongoose from "mongoose";
import BlogModel from "@/lib/models/BlogModel";

// MongoDB connection
const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("MongoDB URI is not defined in environment variables");
}

const ConnectDB = async () => {
  if (mongoose.connection.readyState === 1) return; // If already connected, skip

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "blogDatabase", // Database name
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error:", error);
    throw new Error("Failed to connect to the database");
  }
};

// API endpoint to get all blogs or a specific blog
export async function GET(request: NextRequest) {
  try {
    await ConnectDB();

    const { searchParams } = new URL(request.url);
    const blogId = searchParams.get("blogId");

    if (blogId) {
      // Fetch specific blog by ID
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json({ blog });
    } else {
      // Fetch all blogs if no blogId provided
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// API endpoint to upload blogs
export async function POST(request: NextRequest) {
  try {
    await ConnectDB();

    const formData = await request.formData();
    const timestamp = Date.now();

    // Validate if an image exists
    const image = formData.get("image") as File | null;
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Save the image to the public folder
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const imageName = `${timestamp}_${image.name}`;
    const path = `./public/${imageName}`; // Ensure path is accessible

    await writeFile(path, buffer);

    // Validate other form fields
    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const author = formData.get("author");
    const authorImg = formData.get("authorImg");

    if (!title || !description || !category || !author || !authorImg) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the blog entry
    const blogData = {
      title: title.toString(),
      description: description.toString(),
      category: category.toString(),
      author: author.toString(),
      image: imageName,
      authorImg: authorImg.toString(),
    };

    await BlogModel.create(blogData);
    console.log("Blog Saved");

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("Error processing blog post:", error);
    return NextResponse.json(
      { error: "Failed to process blog post" },
      { status: 500 }
    );
  }
}