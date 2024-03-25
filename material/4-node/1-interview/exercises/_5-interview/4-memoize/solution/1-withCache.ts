import { fetchTemperature, fetchWindSpeed } from '../../shared/api';

// We could make this even more abstract by using generic types
// but we'll keep it simple here. If you want to see a more advanced
// version of this function, check the advanced solution.
export async function withCache(fn: Function) {
  const cache: Record<string, number> = {};

  return async (date: Date) => {
    const cacheKey = date.toISOString().slice(0, 13);

    if (cacheKey in cache) {
      return cache[cacheKey];
    }

    const data = await fn(date);

    cache[cacheKey] = data;

    return data;
  };
}

// Usage example
export const fetchTemperatureCached = withCache(fetchTemperature);
export const fetchWindSpeedCached = withCache(fetchWindSpeed);
