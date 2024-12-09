import express, { Request, Response } from 'express';

import zipRoutes from './zipRoutes';

const app = express();

app.use('/zip', zipRoutes);

// Default
app.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ data: {}, message: 'Use not registered API', status: 404 });
});

export default app;
