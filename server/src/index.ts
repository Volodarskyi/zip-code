import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

import routes from './routes';

const cors = require('cors');

const app = express();
dotenv.config();

app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

app.use('/api', routes);

async function start() {
  app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port: ${process.env.SERVER_PORT}`);
  });
}

start().catch(err => {
  console.log('Server Error:', err.message);
  process.exit(1);
});
