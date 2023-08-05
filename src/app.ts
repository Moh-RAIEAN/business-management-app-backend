import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import notFoundRouteHandler from './app/middlewares/notFoundRouteHandler';
// import ApiError from './app/errors/ApiError';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { AppRoutes } from './app/routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send({ ok: true });
  // throw new ApiError(400, 'bad request');
});

app.use('/api/v1', AppRoutes);
app.use(notFoundRouteHandler);
app.use(globalErrorHandler);

export default app;
