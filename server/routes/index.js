import { Router } from 'express'
import apiRoutes from './api/index.js';
import htmlRoutes from './html.js';

const router = Router();

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

export default router;