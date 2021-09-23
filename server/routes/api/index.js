import { Router } from 'express';
import uploadRoutes from './upload.js';

const api = Router();

api.use('/upload', uploadRoutes);

export default api;
