import { HttpException } from '../utils/HttpException.js';

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Custom error for Zod validation failure
  if (err.name === 'ZodError') {
    statusCode = 400;
    message = err.errors.map(e => e.message).join(', ');
  }

  if (err instanceof HttpException) {
    statusCode = err.status;
    message = err.message;
  }

  // Mongoose bad ObjectId
  // if (err.name === 'CastError' && err.kind === 'ObjectId') {
  //   statusCode = 404;
  //   message = 'Resource not found';
  // }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;