import express, { Request, Response } from "express"; // Import Request and Response
import { 
    createPost, 
    getAllPosts, 
    getPostById, 
    updatePost, 
    deletePost 
} from "../Controllers/index"; // Corrected path to postController.ts

const router = express.Router();

// Root route to fetch GitHub profile
router.get("/", async (req: Request, res: Response): Promise<any>=> {
    const username = req.query.username as string || process.env.USERNAME || "defaultUser"; // Type assertion and fallback

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error(`GitHub API responded with status ${response.status}`);
        }
        const data = await response.json();

        return res.status(200).json({
            success: true,
            data,
            message: "GitHub profile retrieved successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch GitHub profile",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});

// Post Routes

router.get("/posts", getAllPosts);
router.get("/post/:id", getPostById); // ✅ Ensure `/:id` has a valid parameter name
router.post("/post", createPost);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;