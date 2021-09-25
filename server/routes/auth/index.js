import { Router } from 'express';
import userRoutes from './users.js';

const auth = Router();

auth.use('/users', userRoutes);

export default auth;
