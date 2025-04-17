import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.laaz081.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const connectDB = async () =>
  mongoose
    .connect(MONGODB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error: ", err));
