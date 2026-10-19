// TODO: Remove db retry
// import mongoose from "mongoose";

// export const connectMongoDB = async (): Promise<void> => {
//   try {
//     const mongoURI = process.env.MONGO_URI;
//     if (!mongoURI) {
//       throw new Error("MONGO_URI is not defined in the environment variables.");
//     }
//     const conn = await mongoose.connect(mongoURI);
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("Database connection error:", error);
//     process.exit(1);
//   }
// };


import mongoose from "mongoose";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 1000; // 5 seconds delay between retries

export const connectMongoDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined in the environment variables.");
  }

  let retries = MAX_RETRIES;

  while (retries > 0) {
    try {
      const conn = await mongoose.connect(mongoURI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return; // Exit function successfully on connection
    } catch (error) {
      retries--;
      console.error(`Database connection failed. Retries remaining: ${retries}`, error);

      if (retries === 0) {
        console.error("Max connection retries reached. Exiting process.");
        process.exit(1);
      }

      // Wait before attempting to reconnect
      console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    }
  }
};