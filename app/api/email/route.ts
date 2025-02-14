import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import mongoose from "mongoose";
import EmailModel from "@/lib/models/EmailModel"; 

const MONGODB_URI = process.env.MONGO_URI;
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
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await EmailModel.create({ email });

    return NextResponse.json({ success: true, message: "Subscription successful" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}


export async function GET() {
    try {
      await connectDB();
      const emails = await EmailModel.find({}, "_id email"); // Get all emails
      return NextResponse.json({ success: true, emails });
    } catch (error) {
      console.error("Error fetching emails:", error);
      return NextResponse.json({ success: false, error: "Failed to fetch emails" }, { status: 500 });
    }
  }
  
  // **DELETE Handler** → Delete an email by ID
  export async function DELETE(request: NextRequest) {
    try {
      await connectDB();
      const { searchParams } = new URL(request.url);
      const emailId = searchParams.get("id"); // Get email ID from query params
  
      if (!emailId) {
        return NextResponse.json({ success: false, error: "Missing email ID" }, { status: 400 });
      }
  
      // Find and delete the email
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
