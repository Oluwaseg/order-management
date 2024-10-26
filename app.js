import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import logger from './logger.js';
import { errorMiddleware } from './middlewares/error.js';
import authRouter from './routes/auth.js';
import orderRouter from './routes/order.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './doc/swagger.js';

const app = express();

app.use(
  morgan('combined', {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/orders', orderRouter);

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorMiddleware);
export default app;
