import type { Response, Request, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

// Here, instead of using `any` we use a generic type `T` to represent the type of the result.
// This way we can enforce that the return value is of a particular type.
// jsonRoute<Movie>((req) => { ... }) <- if this does not return Movie, TypeScript
// will immediately inform us.
type AsyncRouteHandler<T> = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<T>;

/**
 * Wraps a request handler that returns an object. Sends the result as JSON.
 * Handles async errors.
 * @param handler Request handler that returns a serializable object.
 * @returns Request handler that sends the result as JSON.
 */
export function jsonRoute<T>(
  handler: AsyncRouteHandler<T>,
  statusCode: number = StatusCodes.OK,
): RequestHandler {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      res.status(statusCode).json(result);
    } catch (error) {
      next(error);
    }
  };
}
