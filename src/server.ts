import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoDB } from "./config/mongoConfig.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.ALLOW_ORIGIN 
  ? process.env.ALLOW_ORIGIN.split(",") 
  : [];

// Middlewares
app.use(
  cors({
    origin: (origin, callback) => {   
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes("*")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, //For Allow cookies / authorization headers
  })
);

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