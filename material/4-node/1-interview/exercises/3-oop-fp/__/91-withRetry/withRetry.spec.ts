import { describe, it, expect, vi } from 'vitest';
import { withRetry } from './withRetry';

describe('withRetry', () => {
  it('should call the wrapped function once if it succeeds', async () => {
    const successfn = vi.fn().mockResolvedValue('Immediate success');
    const fn = withRetry(successfn);

    await expect(fn()).resolves.toBe('Immediate success');
  });

  it('should succeed if the wrapped function fails once', async () => {
    const failOnce = vi
      .fn()
      .mockRejectedValueOnce(new Error('Failed attempt 1'))
      .mockResolvedValue('Success');

    const retryingFn = withRetry(failOnce);

    await expect(retryingFn()).resolves.toBe('Success');
    expect(failOnce).toHaveBeenCalledTimes(2);
  });

  it('should throw after failing twice', async () => {
    const failTwice = vi
      .fn()
      .mockRejectedValueOnce(new Error('Failed attempt 1'))
      .mockRejectedValueOnce(new Error('Failed attempt 2'))
      .mockResolvedValue('Success');

    const retryingFn = withRetry(failTwice);

    await expect(retryingFn()).rejects.toThrow('Failed attempt 2');
    expect(failTwice).toHaveBeenCalledTimes(2);
  });
});
