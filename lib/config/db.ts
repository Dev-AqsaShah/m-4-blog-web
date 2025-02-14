import mongoose from "mongoose";
export const ConnectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI as string);
    // await mongoose.connect("mongodb+srv://aqsashah:Hello120@cluster0.vrr7c.mongodb.net/m-4-blog-web");
    console.log("DB Connected");
}