import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

const HOME = '/dashboard';

const auth = {
  guest: (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect(HOME);
  },
  web: (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/login');
  },
  api: passport.authenticate('jwt', { session: false })
};

export default auth;
