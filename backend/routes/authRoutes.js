import express from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
} from "../controllers/authController.js";

const Router = express.Router();

Router.post("/register", registerUser);
Router.post("/login", loginUser);

// Refresh Token Endpoint
Router.post("/refresh-token", refreshToken);

export default Router;
