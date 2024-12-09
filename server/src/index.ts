import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

import routes from './routes';
import { AppError, errorHandler } from './utils/errorHandler';

const cors = require('cors');

const app = express();
dotenv.config();

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

// API Routes
app.use('/api', routes);

// Handle unknown routes
app.use((req, res, next) => {
  next(new AppError('Route not found', 404));
});

// Global error handler
app.use(errorHandler);

async function start() {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port: ${process.env.SERVER_PORT}`);
  });
}

start().catch(err => {
  console.log('Server Error:', err.message);
  process.exit(1);
});
