import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { config } from './config';
import routes from './routes';
import { rateLimiter } from './middleware/rate-limit.middleware';
import { errorMiddleware } from './middleware/error.middleware';
import { NotFoundError } from './utils/errors';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimiter);

app.get('/', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1', routes);

app.use((_req, _res, next) => {
  next(new NotFoundError());
});

app.use(errorMiddleware);

export default app;
