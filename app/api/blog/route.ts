import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import mongoose from "mongoose";
import BlogModel from "@/lib/models/BlogModel";


// MongoDB connection
const MONGODB_URI = "mongodb+srv://aqsashah:Aqsashah120@cluster0.vrr7c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const ConnectDB = async () => {
    if (mongoose.connection.readyState === 1) return; // If already connected, do nothing
    try {
        await mongoose.connect(MONGODB_URI, { 
            dbName: "blogDatabase" // Optional: Specify the database name
        });
        console.log("Database Connected");
    } catch (error) {
        console.error("Database Connection Error:", error);
    }
};

//api endpoint to get all blogs


export async function GET(request: NextRequest) {
  // Connect to the database
  await connectToDatabase();

  try {
    // Extract `blogId` from the query parameters
    const { searchParams } = new URL(request.url); // Get the URL of the request
    const blogId = searchParams.get("blogId"); // Extract blogId from the query string

    if (blogId) {
      // Fetch a specific blog by ID
      const blog = await BlogModel.findById(blogId);

      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }

      return NextResponse.json({ blog });
    } else {
      // Fetch all blogs if no `blogId` is provided
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// api endpoint for uploading blogs

export async function POST(request: NextRequest) {
    try {
        // Connect to the database
        await ConnectDB();

        const formData = await request.formData();
        const timestamp = Date.now();

        // Validate if an image exists
        const image = formData.get("image") as File | null;
        if (!image) {
            return NextResponse.json({ error: "No image provided" }, { status: 400 });
        }

        // Save image to the public folder
        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const imageName = `${timestamp}_${image.name}`;
        const path = `./public/${imageName}`;

        await writeFile(path, buffer);

        // Validate form fields
        const title = formData.get("title");
        const description = formData.get("description");
        const category = formData.get("category");
        const author = formData.get("author");
        const authorImg = formData.get("authorImg");

        if (!title || !description || !category || !author || !authorImg) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Create the blog entry
        const blogData = {
            title: title.toString(),
            description: description.toString(),
            category: category.toString(),
            author: author.toString(),
            image: imageName, // Use the correct saved image name
            authorImg: authorImg.toString(),
        };

        await BlogModel.create(blogData);
        console.log("Blog Saved");

        return NextResponse.json({ success: true, msg: "Blog Added" });
    } catch (error) {
        console.error("Error processing blog post:", error);
        return NextResponse.json({ error: "Failed to process blog post" }, { status: 500 });
    }
}
