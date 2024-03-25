import type { Response, Request, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

// Could we enforce a return value of a particular type?
// For example:
// jsonRoute<Movie>((req) => { ... }) <- if this does not return Movie, TypeScript
// should immediately inform us.
type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

export function jsonRoute(
  handler: AsyncRouteHandler,
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
