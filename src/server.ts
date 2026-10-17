import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { connectMongoDB } from "./config/mongoConfig.js";
import { auth } from "./lib/auth.js"; // <-- Note the .js extension for TypeScript ESM

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.ALLOW_ORIGIN
  ? process.env.ALLOW_ORIGIN.split(",")
  : [];

// 1. CORS Middleware
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
    credentials: true, // For Allow cookies / authorization headers
  })
);

// 2. Better Auth Handler (MUST BE BEFORE express.json())
// Note: Use "/api/auth/*splat" for Express v5, or "/api/auth/*" if you are on Express v4
app.all("/api/auth/*", toNodeHandler(auth));

// 3. Body Parser Middleware (AFTER Better Auth)
app.use(express.json());

// Database Connection (Mongoose for your custom HRMS models)
connectMongoDB();

// Test Route
app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "HRMS Server is running successfully!" });
});

// Protected Route Example: Check current logged-in HRMS user
app.get("/api/me", async (req: Request, res: Response) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  res.json(session);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});