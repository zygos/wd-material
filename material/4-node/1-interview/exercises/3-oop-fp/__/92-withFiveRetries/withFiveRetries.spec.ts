import { it, expect, vi } from 'vitest';
import { withFiveRetries } from './withFiveRetries';

it('should succeed on the first try without retries', async () => {
  const successfn = vi.fn().mockResolvedValue('Immediate success');
  const fn = withFiveRetries(successfn);

  await expect(fn()).resolves.toBe('Immediate success');
});

it('should eventually succeed after failing initial attempts', async () => {
  const failTwice = vi
    .fn()
    .mockRejectedValueOnce(new Error('Failed attempt 1'))
    .mockRejectedValueOnce(new Error('Failed attempt 2'))
    .mockResolvedValue('Success');
  const retryingFn = withFiveRetries(failTwice);

  await expect(retryingFn()).resolves.toBe('Success');

  expect(failTwice).toHaveBeenCalledTimes(3);
});

it('should throw after exhausting all retries', async () => {
  const failAlways = vi.fn().mockRejectedValue(new Error('Always fails'));
  const retryingFn = withFiveRetries(failAlways);

  await expect(retryingFn()).rejects.toThrow('Always fails');

  expect(failAlways).toHaveBeenCalledTimes(6); // Initial + 5 retries
});
