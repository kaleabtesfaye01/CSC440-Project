import { connectDB } from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import passport from "passport";
import googleRoutes from "./routes/googleRoutes.js";
import microsoftRoutes from "./routes/microsoftRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import { errorHandler } from "./middleware/errorHandler.js";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/auth", googleRoutes);
app.use("/api/auth", microsoftRoutes);

app.use(passport.initialize());

app.use("/api", protect);

app.use(errorHandler);

export { app };
