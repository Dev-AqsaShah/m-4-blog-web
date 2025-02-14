import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import EmailModel from "@/lib/models/EmailModel"; 

const MONGODB_URI = process.env.MONGO_URI as string; // ✅ Ensure type safety
if (!MONGODB_URI) {
  throw new Error("MongoDB URI is not defined");
}

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGODB_URI, { dbName: "blogDatabase" });
  console.log("Database Connected");
};

// ✅ POST: Subscribe Email
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json().catch(() => null); // ✅ Prevent JSON parsing errors

    if (!body || !body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await EmailModel.create({ email: body.email });

    return NextResponse.json({ success: true, message: "Subscription successful" });
  } catch (error) {
    console.error("Error in POST:", error);
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
    console.error("Error fetching emails:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch emails" }, { status: 500 });
  }
}

// ✅ DELETE: Remove email by ID
export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const emailId = searchParams.get("id")?.trim(); // ✅ Ensure valid ID

    if (!emailId) {
      return NextResponse.json({ success: false, error: "Email ID is required" }, { status: 400 });
    }

    const deletedEmail = await EmailModel.findByIdAndDelete(emailId);
    if (!deletedEmail) {
      return NextResponse.json({ success: false, error: "Email not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Email deleted successfully" });
  } catch (error) {
    console.error("Error deleting email:", error);
    return NextResponse.json({ success: false, error: "Failed to delete email" }, { status: 500 });
  }
}
