import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Find user by decoded token id (excluding password)
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ error: "Not authorized, token failed" });
    }
  }
  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
};
