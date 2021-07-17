import PassportJWT from 'passport-jwt';
import PassportLocal from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../database/models/user';
import { Request } from 'express';

const JwtStrategy = PassportJWT.Strategy;
// ExtractJwt = PassportJWT.ExtractJwt;

const customFields = {
  usernameField: 'email',
  passwordField: 'password'
};
const LocalStrategy = PassportLocal.Strategy;
const localStrategy = new LocalStrategy(
  customFields,
  async (username, password, done) => {
    const user = await User.query().where('email', username).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      return done(null, user);
    }
    return done(null, false);
  }
);

passport.use(localStrategy);

const opts = {
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  jwtFromRequest: function (req: Request) {
    let token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
  },
  secretOrKey: process.env.JWT_SECRET,
  issuer: 'api.example.com',
  audience: 'app.example.com'
};

const jwtStrategy = new JwtStrategy(opts, async function (payload, done) {
  if (Date.now() > payload.exp) {
    done('Unauthorized', false);
  }
  const user = await User.query().findById(payload.sub);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
});

passport.use(jwtStrategy);

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id: any, done) {
  const user = await User.query().findById(id);
  if (user) {
    done(null, user);
  } else {
    done(new Error('User not found'));
  }
});
