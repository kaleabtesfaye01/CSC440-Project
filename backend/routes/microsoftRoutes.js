// backend/routes/microsoftAuthRoutes.js
import express from "express";
import passport from "../config/passportMicrosoft.js"; // Adjust the import based on your project structure
import jwt from "jsonwebtoken";

const router = express.Router();

// Route to initiate Microsoft authentication
router.get("/microsoft", passport.authenticate("azure_ad_oauth2"));

// Callback route for Microsoft OAuth
router.get(
  "/microsoft/callback",
  passport.authenticate("azure_ad_oauth2", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // If authentication is successful, generate a JWT token for the frontend.
    const token = jwt.sign(
      {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      {
        id: req.user._id,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      }
    );
    // Send the token back to the client

    res.redirect(
      `http://localhost:5173/auth/callback?token=${token}&refreshToken=${refreshToken}`
    );
  }
);

export default router;
