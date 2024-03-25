import { type ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

// necessary as Express would not recognize this as an error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jsonErrors: ErrorRequestHandler = (error, req, res, next) => {
  res.status(error.status ?? StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: {
      message: error.message ?? 'Internal server error',
      ...error,
    },
  });
};

export default jsonErrors;
