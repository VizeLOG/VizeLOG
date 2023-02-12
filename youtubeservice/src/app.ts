import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { searchTrendRouter } from './routes/search-trend';

const app = express();
app.set('trust proxy', true);
app.use(json());


app.use(searchTrendRouter);


app.all('*', async (req, res) => {
  throw new Error();
});

// middleware

export { app };
