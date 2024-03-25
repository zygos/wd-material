import { beforeEach, describe, expect, it, vi } from 'vitest';
import { withCache } from './withCache';

const fetchTemperature = vi.fn(async (date: Date) => 20 + date.getDate());
const fetchTemperatureCached = withCache(fetchTemperature);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('fetchTemperatureCached', () => {
  it('return the same value for the same day', async () => {
    const first = await fetchTemperatureCached(new Date('2024-02-10'));
    const second = await fetchTemperatureCached(new Date('2024-02-10'));

    expect(first).toBe(second);
  });

  it('does not call the same function twice for same input', async () => {
    await fetchTemperatureCached(new Date('2024-02-11'));
    await fetchTemperatureCached(new Date('2024-02-11'));

    expect(vi.mocked(fetchTemperature)).toBeCalledTimes(1);
  });

  it('return different values for different days', async () => {
    const first = await fetchTemperatureCached(new Date('2024-02-12'));
    const second = await fetchTemperatureCached(new Date('2024-02-13'));

    expect(first).not.toBe(second);
  });

  it('calls the same function twice for different inputs', async () => {
    await fetchTemperatureCached(new Date('2024-02-14'));
    await fetchTemperatureCached(new Date('2024-02-15'));

    expect(vi.mocked(fetchTemperature)).toBeCalledTimes(2);
  });
});
