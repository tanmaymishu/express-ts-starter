import { NextFunction, Router } from 'express';
import * as PingController from '../controllers/ping.controller';
import authorize from '../middleware/auth.middleware';

const router = Router();

router.get('/ping', authorize, PingController.pong);

export default router;
