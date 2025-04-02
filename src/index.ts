import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./Routers/index"; // Import the router, not individual controllers

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.DB_URL || "";

app.use(express.json());
app.use("/api", router); // Mount the router at /api
app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
      status: true,
      message: "Hello World!",
    });
  });
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
};

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        error: "Route Not Found",
        message: `The requested URL '${req.originalUrl}' was not found on this server.`,
    });
});

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
};

startServer();