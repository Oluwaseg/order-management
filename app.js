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

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Order Management API</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          text-align: center;
        }
        h1 {
          color: #333;
        }
        .container {
          max-width: 600px;
          background-color: #fff;
          padding: 40px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }
        p {
          font-size: 18px;
          color: #555;
        }
        a {
          display: inline-block;
          margin-top: 20px;
          text-decoration: none;
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 0.3s;
        }
        a:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to the Order Management API</h1>
        <p>Use the available API endpoints to manage orders and authentication.</p>
        <a href="/api/v1/docs">Go to API Documentation</a>
      </div>
    </body>
    </html>
  `);
});

app.use(errorMiddleware);
export default app;
