import mongoose, { Schema, Document } from "mongoose";

// Define Post Interface
export interface IPost extends Document {
    name: string;
    description: string;
    content: string;
}

// Create Post Schema
const PostSchema = new Schema<IPost>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true }
}, { timestamps: true });

// Export Model
export const Post = mongoose.model<IPost>("Post", PostSchema);
