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
    console.log("🚀 Connecting to MongoDB...");
    
    // ✅ Set keepAlive globally
    mongoose.set("strictQuery", false);
    mongoose.set("bufferCommands", false);
    
    await mongoose.connect(MONGODB_URI, {
      dbName: "blogDatabase",
      maxPoolSize: 10, // Helps keep the connection alive
      serverSelectionTimeoutMS: 10000, // 10s timeout
      socketTimeoutMS: 60000, // 60s socket timeout
    });

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
