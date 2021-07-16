import { Router } from 'express';
import authRoutes from './auth';

const router = Router();

router.use('/', authRoutes);

export default router;
