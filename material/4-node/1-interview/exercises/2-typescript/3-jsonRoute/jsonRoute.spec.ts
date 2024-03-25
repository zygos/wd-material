import { expect, it, vi } from 'vitest';
import { jsonRoute } from './jsonRoute';

const handler = vi.fn(async () => ({
  result: true,
}));

function buildRequestArgs() {
  const res = {
    status: vi.fn(() => res),
    json: vi.fn(),
  } as any;

  return {
    req: (() => {}) as any,
    res,
    next: vi.fn(),
  };
}

it('should return a function', () => {
  const routeHandler = jsonRoute(handler);

  expect(typeof routeHandler).toBe('function');
});

it('should call the request json method with the handler result', async () => {
  const routeHandler = jsonRoute(handler);

  const { req, res, next } = buildRequestArgs();

  await routeHandler(req, res, next);

  expect(res.json).toHaveBeenCalledWith({ result: true });
});
