import { Router } from 'express';
import * as RegisterController from '../../controllers/api/register.controller';
import * as LoginController from '../../controllers/api/login.controller';
import validate from '../../middleware/validation.middleware';

const router = Router();

router.post(
  '/register',
  validate(RegisterController.rules),
  RegisterController.store
);

router.post('/login', validate(LoginController.rules), LoginController.store);

export default router;