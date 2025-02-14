import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error("MongoDB URI is not defined in environment variables");
}

// Configure Mongoose settings
mongoose.set("strictQuery", false); // Recommended for flexibility in queries

export const ConnectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "blogDatabase", // Ensure database name is specified
      serverSelectionTimeoutMS: 5000, // Quick failure if DB is unreachable
      socketTimeoutMS: 45000, // Prevents long delays in queries
    });

    console.log("DB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
