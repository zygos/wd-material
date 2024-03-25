import { describe, it, expect, vi } from 'vitest';
import { withRetries } from './withRetries';

describe('withRetries', () => {
  it('should succeed on the first try without retries', async () => {
    const successfn = vi.fn().mockResolvedValue('Immediate success');
    const fn = withRetries(2, successfn);

    await expect(fn()).resolves.toBe('Immediate success');
    expect(successfn).toHaveBeenCalledTimes(1);
  });

  it('should eventually succeed after failing initial attempts', async () => {
    const failTwice = vi
      .fn()
      .mockRejectedValueOnce(new Error('Failed attempt 1'))
      .mockRejectedValueOnce(new Error('Failed attempt 2'))
      .mockResolvedValue('Success');
    const retryingFn = withRetries(3, failTwice);

    await expect(retryingFn()).resolves.toBe('Success');

    expect(failTwice).toHaveBeenCalledTimes(3);
  });

  it('should throw after exhausting all retries', async () => {
    const failAlways = vi.fn().mockRejectedValue(new Error('Always fails'));
    const retryingFn = withRetries(2, failAlways);

    await expect(retryingFn()).rejects.toThrow('Always fails');

    expect(failAlways).toHaveBeenCalledTimes(3); // Initial + 2 retries
  });
});
