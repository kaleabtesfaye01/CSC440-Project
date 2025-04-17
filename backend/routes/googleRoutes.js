import express from "express";
import passport from "../config/passportGoogle.js"; // Adjust the import based on your project structure
import jwt from "jsonwebtoken";

const router = express.Router();

// Route to start Google authentication
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/calendar.readonly",
    ],
  })
);

// Callback route for Google to redirect to after authentication
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Successful authentication. Generate JWT token.
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

    res.redirect(
      `http://localhost:5173/auth/callback?token=${token}&refreshToken=${refreshToken}`
    );
  }
);

export default router;
