import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../models/user_model.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      return req.cookies.token || null;
    },
  ]),
  secretOrKey: process.env.jwt_secret,
};

const verifyJwt = async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
};

const jwtStrategy = new Strategy(opts, verifyJwt);
passport.use(jwtStrategy);

export const authenticateJwt = passport.authenticate("jwt", { session: false });
