import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import EmailModel from "@/lib/models/EmailModel"; 

const MONGODB_URI = process.env.MONGO_URI as string;

// ✅ Ensure MongoDB URI exists
if (!MONGODB_URI) {
  throw new Error("❌ MongoDB URI is not defined in environment variables");
}

// ✅ Optimized MongoDB connection function
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    console.log("🚀 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, {
      dbName: "blogDatabase", 
      maxPoolSize: 10, // ✅ Optimized connection pooling
      serverSelectionTimeoutMS: 5000, // ✅ Avoids long wait times
      socketTimeoutMS: 45000, // ✅ Prevents unexpected disconnections
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

// ✅ POST: Subscribe Email
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json().catch(() => null); // ✅ Prevents JSON parsing errors

    if (!body?.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await EmailModel.create({ email: body.email });

    return NextResponse.json({ success: true, message: "Subscription successful" });
  } catch (error) {
    console.error("❌ Error in POST:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

// ✅ GET: Fetch all emails
export async function GET() {
  try {
    await connectDB();
    const emails = await EmailModel.find({}, "_id email");
    return NextResponse.json({ success: true, emails });
  } catch (error) {
    console.error("❌ Error fetching emails:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch emails" }, { status: 500 });
  }
}

// ✅ DELETE: Remove email by ID
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const emailId = searchParams.get("id")?.trim();

    if (!emailId) {
      return NextResponse.json({ success: false, error: "Email ID is required" }, { status: 400 });
    }

    const deletedEmail = await EmailModel.findByIdAndDelete(emailId);
    if (!deletedEmail) {
      return NextResponse.json({ success: false, error: "Email not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Email deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting email:", error);
    return NextResponse.json({ success: false, error: "Failed to delete email" }, { status: 500 });
  }
}
