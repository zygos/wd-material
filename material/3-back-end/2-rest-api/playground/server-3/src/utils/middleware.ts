import {
  type Response,
  type Request,
  type NextFunction,
  type RequestHandler,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import MethodNotAllowed from './errors/MethodNotAllowed';

type JsonHandler<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<T>;

/**
 * Wraps a request handler that returns an object and
 * sends it as JSON. Handles async errors.
 * @param handler Request handler that returns a serializable object.
 * @returns Request handler that sends the result as JSON.
 */
export function jsonRoute<T>(
  handler: JsonHandler<T>,
  statusCode = StatusCodes.OK
): RequestHandler {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      res.status(statusCode);
      res.json(result as T);
    } catch (error) {
      next(error);
    }
  };
}

export function unsupportedRoute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next(new MethodNotAllowed());
}
