import passport from "passport";
import { Strategy as AzureAdOAuth2Strategy } from "passport-azure-ad-oauth2";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

passport.use(
  new AzureAdOAuth2Strategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: process.env.MICROSOFT_CALLBACK_URL,
    },
    async (accessToken, refresh_token, params, profile, done) => {
      try {
        const decoded = jwt.decode(params.id_token);

        const email = decoded.email;

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            email,
            firstName: decoded.given_name,
            lastName: decoded.family_name,
            password: "microsoft-oauth",
          });
        }
        return done(null, user);
      } catch (error) {
        console.error("Error in Microsoft Strategy:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error("Error in deserializeUser:", error);
    done(error, null);
  }
});

export default passport;
