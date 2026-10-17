import dotenv from "dotenv";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

// Create native MongoDB client instance for Better Auth
const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(); 

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client, // Passing client enables database transactions for replica sets/Atlas
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Allow your frontend origins + localhost:5000 for Postman testing
  trustedOrigins: process.env.ALLOW_ORIGIN
    ? process.env.ALLOW_ORIGIN.split(",")
    : ["http://localhost:5000", "http://localhost:3000"],
});