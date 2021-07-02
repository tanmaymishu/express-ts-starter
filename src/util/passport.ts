import PassportJWT from "passport-jwt";
import passport from "passport";
import User from "../database/models/User";

var JwtStrategy = PassportJWT.Strategy,
  ExtractJwt = PassportJWT.ExtractJwt;
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  issuer: "api.example.com",
  audience: "app.example.com",
};
passport.use(
  new JwtStrategy(opts, async function (payload, done) {
    const user = await User.query().findById(payload.sub);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  })
);
