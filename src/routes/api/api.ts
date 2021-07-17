import { NextFunction, Router } from 'express';
import pingController from '../../controllers/api/ping.controller';
import userController from '../../controllers/api/user.controller';
import auth from '../../middleware/auth.middleware';

const router = Router();

router.get('/ping', pingController.pong);
router.get('/users', auth.api, userController.index);

export default router;
