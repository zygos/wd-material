import { fetchTemperature, fetchWindSpeed } from '../../shared/api';

type AsyncFunction = (...args: any[]) => Promise<any>;

type CacheKeyGenerator<T extends AsyncFunction> = (
  ...args: Parameters<T>
) => string;

/**
 * Wraps a function with an in-memory cache.
 * @param getCacheKey Generates a cache string key based on the function arguments.
 * @param fn The function to be wrapped.
 * @returns A new function that caches the results of the original function.
 */
export function withCache<F extends AsyncFunction>(
  getCacheKey: CacheKeyGenerator<F>,
  fn: F,
) {
  const cache: Record<string, Awaited<ReturnType<F>>> = {};

  return async (...args: Parameters<F>): Promise<Awaited<ReturnType<F>>> => {
    const cacheKey = getCacheKey(...args);

    if (cacheKey in cache) {
      return cache[cacheKey];
    }

    const data = await (fn(...args) as ReturnType<F>);

    cache[cacheKey] = data;

    return data;
  };
}

// Usage example, though this additional configuration would require
// updating the tests to reflect custom cache key generation.
// This allows for more flexibility in the cache key generation and have
// hour-based cache for temperature and minute-based cache for wind speed.
const getDateHour = (date: Date) => date.toISOString().slice(0, 13);
const getDateHourMinute = (date: Date) => date.toISOString().slice(0, 16);

const fetchTemperatureCached = withCache(getDateHour, fetchTemperature);
const fetchWindSpeedCached = withCache(getDateHourMinute, fetchWindSpeed);
