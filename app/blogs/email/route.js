import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

// Ensure the database is connected before handling requests
const ensureDBConnection = async () => {
  try {
    await ConnectDB();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection failed");
  }
};

// API endpoint to handle POST requests (subscribe email)
export async function POST(request) {
  try {
    await ensureDBConnection();

    const formData = await request.formData();
    const email = formData.get("email");

    if (!email) {
      return NextResponse.json({ success: false, msg: "Email is required" }, { status: 400 });
    }

    // Save email to the database
//     const emailData = { email };
//     await EmailModel.create(emailData);

//     return NextResponse.json({ success: true, msg: "Email subscribed successfully" });
//   } catch (error) {
//     console.error("Error in POST request:", error);
//     return NextResponse.json({ success: false, msg: "Failed to subscribe email" }, { status: 500 });
//   }
// }

return NextResponse.json({ success: true, msg: "Email subscribed successfully" });
} catch (error) {
  console.error("Error in POST request:", error); // ✅ Logs the error
  return NextResponse.json(
    { success: false, msg: "Failed to subscribe email" },
    { status: 500 }
  );
}
}

// API endpoint to handle GET requests (retrieve all emails)
export async function GET() {
  try {
    await ensureDBConnection();

    const emails = await EmailModel.find({});
    return NextResponse.json({ success: true, emails });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ success: false, msg: "Failed to fetch emails" }, { status: 500 });
  }
}

// API endpoint to handle DELETE requests (delete email by ID)
export async function DELETE(request) {
  try {
    await ensureDBConnection();

    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, msg: "Email ID is required" }, { status: 400 });
    }

    const deletedEmail = await EmailModel.findByIdAndDelete(id);

    if (!deletedEmail) {
      return NextResponse.json({ success: false, msg: "Email not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, msg: "Email deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE request:", error);
    return NextResponse.json({ success: false, msg: "Failed to delete email" }, { status: 500 });
  }
}
