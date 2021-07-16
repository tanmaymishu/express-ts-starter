import { NextFunction, Router } from 'express';
import * as PingController from '../../controllers/api/ping.controller';
import * as UserController from '../../controllers/api/user.controller';
import auth from '../../middleware/auth.middleware';

const router = Router();

router.get('/ping', PingController.pong);
router.get('/users', auth.api, UserController.index);

export default router;
