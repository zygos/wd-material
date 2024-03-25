import type { RequestHandler } from 'express';

export function jsonRoute(handler: Function): RequestHandler {
  return async (req, res, next) => {
    const result = await handler(req, res, next);
    // TODO: could you allow the user of jsonRoute to set a custom status code?
    res.status(200);
    res.json(result);
  };
}
