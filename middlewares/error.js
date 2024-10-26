import logger from '../logger.js';
export const errorMiddleware = (err, req, res, next) => {
  // Log the error to the console
  logger.error(err.stack);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific types of errors
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ${err.path} format`;
  } else if (err.code === 11000) {
    statusCode = 400;
    message = `Duplicate field value entered`;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  res.status(statusCode).json({
    status: 'fail',
    message,
  });
};
