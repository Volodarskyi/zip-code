import express from 'express';

import zipRoutes from './zipRoutes';

const app = express();

app.use('/zip', zipRoutes);

export default app;
