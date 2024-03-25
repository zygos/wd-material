import type { RequestHandler } from 'express';

// Right now this doesn't do anything. This is a pass-through function.
// It takes our original handler as an argument and returns a function
// that accepts its arguments. Then it pass them to the original handler.
// In effect, this function does nothing. It simply wraps the original
// handler. However, this allows us to do something before and after
// calling the original handler.
export function jsonRoute(handler: Function): RequestHandler {
  return (req, res, next) => {
    // TODO: Can we get the unique result (for example, a movie) from the handler
    // and then do something with it?
    return handler(req, res, next);
  };
}
