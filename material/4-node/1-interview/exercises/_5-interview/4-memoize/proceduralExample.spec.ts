import { fetchTemperature } from '../shared/api';
import { fetchTemperatureCached } from './proceduralExample';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../shared/api', () => ({
  fetchTemperature: vi.fn(async (day: number) => 20 + day),
}));

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
    await fetchTemperatureCached(new Date('2024-02-13'));
    await fetchTemperatureCached(new Date('2024-02-13'));

    expect(vi.mocked(fetchTemperature)).toBeCalledTimes(1);
  });

  it('return different values for different days', async () => {
    const first = await fetchTemperatureCached(new Date('2024-02-14'));
    const second = await fetchTemperatureCached(new Date('2024-02-15'));

    expect(first).not.toBe(second);
  });

  it('calls the same function twice for different inputs', async () => {
    await fetchTemperatureCached(new Date('2024-02-20'));
    await fetchTemperatureCached(new Date('2024-02-21'));

    expect(vi.mocked(fetchTemperature)).toBeCalledTimes(2);
  });
});
