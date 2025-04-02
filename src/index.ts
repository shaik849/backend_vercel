import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.get("/", async (req: Request, res: Response) : Promise<any> => {
    return await res.json({ message: "hello world" });
});



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
