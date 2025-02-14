import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect("mongodb+srv://aqsashah000000:rtX0yr9YFkNXnmNR@admin-blog.r3lg9.mongodb.net/?retryWrites=true&w=majority&appName=admin-blog");
    // await mongoose.connect("mongodb+srv://aqsashah:Hello120@cluster0.vrr7c.mongodb.net/m-4-blog-web");
    console.log("DB Connected");
}