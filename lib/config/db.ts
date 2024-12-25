import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect("mongodb+srv://aqsashah:Aqsashah120@cluster0.vrr7c.mongodb.net/blog-web");
    console.log("DB Connected")
}