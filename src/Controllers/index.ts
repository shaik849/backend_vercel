import { Request, Response } from "express";
import { Post, IPost } from "../Models/index";

// Create a new post
export const createPost = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, description, content } = req.body;

        // Validation
        if (!name || typeof name !== "string" || name.trim().length < 3 || name.trim().length > 50) {
            return res.status(400).json({ success: false, message: "Name must be a string between 3 and 50 characters" });
        }
        if (!description || typeof description !== "string" || description.trim().length < 10 || description.trim().length > 200) {
            return res.status(400).json({ success: false, message: "Description must be a string between 10 and 200 characters" });
        }
        if (!content || typeof content !== "string" || content.trim().length < 20) {
            return res.status(400).json({ success: false, message: "Content must be at least 20 characters" });
        }

        const post = new Post({ name: name.trim(), description: description.trim(), content: content.trim() });
        const savedPost = await post.save();

        return res.status(201).json({ success: true, data: savedPost, message: "Post created successfully" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get all posts
export const getAllPosts = async (req: Request, res: Response) :Promise<any>=> {
    try {
        const posts = await Post.find();
        return res.status(200).json({ success: true, data: posts, message: "Posts retrieved successfully" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response):Promise<any> => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        return res.status(200).json({ success: true, data: post, message: "Post retrieved successfully" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Update a post
export const updatePost = async (req: Request, res: Response) :Promise<any>=> {
    try {
        const { name, description, content } = req.body;

        // Validation (only if fields are provided)
        if (name !== undefined && (typeof name !== "string" || name.trim().length < 3 || name.trim().length > 50)) {
            return res.status(400).json({ success: false, message: "Name must be a string between 3 and 50 characters" });
        }
        if (description !== undefined && (typeof description !== "string" || description.trim().length < 10 || description.trim().length > 200)) {
            return res.status(400).json({ success: false, message: "Description must be a string between 10 and 200 characters" });
        }
        if (content !== undefined && (typeof content !== "string" || content.trim().length < 20)) {
            return res.status(400).json({ success: false, message: "Content must be at least 20 characters" });
        }

        const updateData: Partial<IPost> = {};
        if (name) updateData.name = name.trim();
        if (description) updateData.description = description.trim();
        if (content) updateData.content = content.trim();

        const post = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        return res.status(200).json({ success: true, data: post, message: "Post updated successfully" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) :Promise<any>=> {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }
        return res.status(200).json({ success: true, message: "Post deleted successfully" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
