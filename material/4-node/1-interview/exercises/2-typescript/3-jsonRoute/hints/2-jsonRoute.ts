import type { RequestHandler } from 'express';

export function jsonRoute(handler: Function): RequestHandler {
  return async (req, res, next) => {
    const result = await handler(req, res, next);
    // TODO: What should we do with the result?
  };
}
