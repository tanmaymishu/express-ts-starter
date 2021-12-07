import ServiceProvider from "./service-provider";
import PassportJWT from 'passport-jwt';
import PassportLocal from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import Repository from "../repositories/repository";
import Container, { Inject, Service } from "typedi";
import Authenticatable from "../database/authenticatable";

export default class AuthServiceProvider extends ServiceProvider {
    public userRepository: Repository<Authenticatable> = Container.get('user.repository');
    async register() {
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
                const user = await this.userRepository.findOne({ email: username }) as Authenticatable;
                if (user && bcrypt.compareSync(password, user.getPassword())) {
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
        let that = this;
        const jwtStrategy = new JwtStrategy(opts, async function (payload, done) {
            if (Date.now() > payload.exp) {
                return done(null, false);
            }
            // const user = await User.query().findById(payload.sub);
            const user = await that.userRepository.findById(payload.sub) as Authenticatable;
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        });

        passport.use(jwtStrategy);

        passport.serializeUser(function (user: any, done) {
            done(null, user.getId());
        });

        passport.deserializeUser(async function (id: any, done) {
            // const user = await User.query().findById(id);
            const user = await that.userRepository.findById(id) as Authenticatable;
            if (user) {
                done(null, user);
            } else {
                done(new Error('User not found'));
            }
        });

    }
}
