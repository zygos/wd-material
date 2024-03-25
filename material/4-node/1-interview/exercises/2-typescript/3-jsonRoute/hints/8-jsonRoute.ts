import type { Response, Request, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

type AsyncRouteHandler<T> = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<T>;

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
