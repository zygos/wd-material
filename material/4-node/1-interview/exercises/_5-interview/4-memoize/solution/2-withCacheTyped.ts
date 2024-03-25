import { fetchTemperature, fetchWindSpeed } from '../../shared/api';

type AsyncFunction = (...args: any[]) => Promise<any>;

export function withCache<F extends AsyncFunction>(fn: F) {
  const cache: Record<string, ReturnType<F>> = {};

  return async (...args: Parameters<F>) => {
    // still makes the assumption that the first argument is a Date object
    const date = args[0] as Date;
    const cacheKey = date.toISOString().slice(0, 13);

    if (cacheKey in cache) {
      return cache[cacheKey];
    }

    const data = await (fn(date) as ReturnType<F>);

    cache[cacheKey] = data;

    return data;
  };
}

// Usage example
const fetchTemperatureCached = withCache(fetchTemperature);
const fetchWindSpeedCached = withCache(fetchWindSpeed);
