import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Database connection error:", err));

const PORT = 5050;

const app = express();

app.get("/", (req, res) =>
  res.send("Smart Booking System Backend is running...")
);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
