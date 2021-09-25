import { Router } from 'express'
import apiRoutes from './api/index.js';
import authRoutes from './auth/index.js';
import htmlRoutes from './html.js';

const router = Router();

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);
router.use('/', htmlRoutes);

export default router;