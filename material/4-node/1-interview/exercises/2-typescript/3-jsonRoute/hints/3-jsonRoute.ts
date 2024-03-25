import type { RequestHandler } from 'express';

export function jsonRoute(handler: Function): RequestHandler {
  return async (req, res, next) => {
    const result = await handler(req, res, next);
    // TODO: How would you set the status code?
    res.json(result);
  };
}
