import app from "../src/app";
import { connectDB } from "../src/config/db";

import mongoose from "mongoose";

// Connect to MongoDB
if (mongoose.connection.readyState === 0) {
  connectDB().catch(console.error);
}

export default app;
