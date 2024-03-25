import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

// Could we define a type for our handler, which is a function that takes
// the same arguments as a RequestHandler, yet returns a Promise?
export function jsonRoute(
  handler: Function,
  statusCode: number = StatusCodes.OK,
): RequestHandler {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      res.status(statusCode);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}
