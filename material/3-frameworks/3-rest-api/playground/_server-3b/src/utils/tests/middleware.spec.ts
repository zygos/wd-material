import { jsonRoute } from '../middleware';

describe('jsonRoute', () => {
  it('should return a function', () => {
    const handler = buildHandler();
    const route = jsonRoute(handler);

    expect(typeof route).toBe('function');
  });

  it('should call the request json method with the handler result', async () => {
    const handler = buildHandler();
    const route = jsonRoute(handler);
    const { req, res, next } = buildReqResNext();

    await route(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ result: true });
  });
});

const buildHandler = () =>
  vi.fn(async () => ({
    result: true,
  }));

const buildReqResNext = () => ({
  req: (() => {}) as any,
  res: { json: vi.fn() } as any,
  next: vi.fn(),
});
