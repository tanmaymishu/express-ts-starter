import { Router } from 'express';
import passport from 'passport';
import loginController from '../../controllers/login.controller';
import registerController from '../../controllers/register.controller';
import dashboardController from '../../controllers/dashboard.controller';
import auth from '../../middleware/auth.middleware';
import validate from '../../middleware/validation.middleware';

const router = Router();

router.get('/login', auth.guest, loginController.create);
router.get('/register', auth.guest, registerController.create);
router.post(
  '/register',
  auth.guest,
  validate(registerController.rules),
  registerController.store
);
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: 'Invalid Username or Password.',
    successFlash: 'Login Successful.'
  })
);

router.delete('/logout', auth.web, loginController.destroy);
router.get('/dashboard', auth.web, dashboardController.index);

export default router;
