import express from 'express';

import authRoutes from './authRoutes';
import zipRoutes from './zipRoutes';
import authMiddleware from '../middlewares/authMiddleware';

const app = express();

app.use('/auth', authRoutes);
app.use('/zip', authMiddleware, zipRoutes);

export default app;
