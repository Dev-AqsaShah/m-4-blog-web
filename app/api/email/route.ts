import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import EmailModel from "@/lib/models/EmailModel";

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGO_URI as string;
  if (!MONGODB_URI) throw new Error("MongoDB URI is not defined in environment variables");
  if (mongoose.connection.readyState >= 1) return;

  mongoose.set("strictQuery", false);
  mongoose.set("bufferCommands", false);
  await mongoose.connect(MONGODB_URI, {
    dbName: "blogDatabase",
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 60000,
  });
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json().catch(() => null);
    if (!body?.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    await EmailModel.create({ email: body.email });
    return NextResponse.json({ success: true, message: "Subscription successful" });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const emails = await EmailModel.find({}, "_id email");
    return NextResponse.json({ success: true, emails });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch emails" }, { status: 500 });
  }
}

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
    return NextResponse.json({ success: true, msg: "Email deleted successfully" });
  } catch (error) {
    console.error("Error deleting email:", error);
    return NextResponse.json({ success: false, error: "Failed to delete email" }, { status: 500 });
  }
}
