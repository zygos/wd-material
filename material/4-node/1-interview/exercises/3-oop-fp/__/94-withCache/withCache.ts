import { fetchTemperature, fetchWindSpeed } from '../shared/api';

export function withCache(fn: Function) {
  return async (date: Date) => {
    // TODO: Implement caching wrapper.

    // unique cache key for each hour
    const cacheKey = date.toISOString().slice(0, 13);

    return await fn(date);
  };
}

// Expected usage example. withCache wraps any given function
// and caches its results.
const fetchTemperatureCached = withCache(fetchTemperature);
const fetchWindSpeedCached = withCache(fetchWindSpeed);
