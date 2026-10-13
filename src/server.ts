import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoDB } from "./config/mongoConfig.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
connectMongoDB();

// Test Route
app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "HRMS Server is running successfully!" });
});

// additional routes can be added here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});