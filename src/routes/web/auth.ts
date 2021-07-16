import { Router } from 'express';
import passport from 'passport';
import * as LoginController from '../../controllers/login.controller';
import * as DashboardController from '../../controllers/dashboard.controller';
import validate from '../../middleware/validation.middleware';
import auth from '../../middleware/auth.middleware';

const router = Router();

router.get('/login/create', auth.guest, LoginController.create);
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login/create',
    failureFlash: 'Invalid Username or Password.',
    successFlash: 'Welcome'
  })
);

router.get('/dashboard', auth.web, DashboardController.index);

export default router;
