import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import routes from './routes';
import { AppError, errorHandler } from './utils/errorHandler';
import { connect } from 'mongoose';

const cors = require('cors');

const app = express();
dotenv.config();

// TODO For production, this should be restricted to trusted domains.
app.use(cors({ origin: '*' })); //Allows requests from any origin

app.use(bodyParser.urlencoded({ extended: false })); //Parses incoming requests with URL-encoded payloads
app.use(bodyParser.json()); //Parses incoming JSON request bodies

// Security
app.use(helmet());
app.use(helmet.hsts()); // HTTP Strict Transport Security
app.use(helmet.noSniff()); // Prevent browsers from sniffing MIME types
app.use(helmet.xssFilter()); // Prevent XSS attacks
app.use(helmet.frameguard()); // Prevent clickjacking

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit to 100 requests per window
});

app.use(limiter);

// API Routes
app.use('/api', routes);

// Handle unknown routes
app.use((req, res, next) => {
  next(new AppError('Route not found', 404));
});

// Global error handler
app.use(errorHandler);

async function start() {
  if (typeof process.env.MONGO_URI === 'string') {
    await connect(process.env.MONGO_URI);
  }

  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port: ${process.env.SERVER_PORT}`);
  });
}

start().catch(err => {
  console.log('Server Error:', err.message);
  process.exit(1);
});
