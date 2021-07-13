import { NextFunction, Router } from 'express';
import * as PingController from '../controllers/ping.controller';
import * as UserController from '../controllers/user.controller';
import authorize from '../middleware/auth.middleware';

const router = Router();

router.get('/ping', authorize, PingController.pong);
router.get('/users', authorize, UserController.index);

export default router;
