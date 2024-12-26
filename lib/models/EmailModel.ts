import mongoose, { Schema, Document, Model } from "mongoose";

// Define the interface for the document
export interface IEmail extends Document {
  email: string;
  date: Date;
}

// Define the schema
const EmailSchema: Schema<IEmail> = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Define the model
const EmailModel: Model<IEmail> =
  mongoose.models.email || mongoose.model<IEmail>("email", EmailSchema);

export default EmailModel;
