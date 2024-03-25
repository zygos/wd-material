import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export function jsonRoute(
  handler: Function,
  statusCode: number = StatusCodes.OK, // here we are setting a default value for the status code
): RequestHandler {
  return async (req, res, next) => {
    // TODO: How would you wrap this in a try/catch block to handle errors?
    const result = await handler(req, res, next);
    res.status(statusCode);
    res.json(result);
  };
}
