import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const ConnectDB = async () => {
  const MONGODB_URI = process.env.MONGO_URI as string;

  if (!MONGODB_URI) {
    throw new Error("MongoDB URI is not defined in environment variables");
  }

  if (mongoose.connection.readyState >= 1) return;

  try {
    mongoose.set("bufferCommands", false);
    await mongoose.connect(MONGODB_URI, {
      dbName: "blogDatabase",
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 60000,
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
