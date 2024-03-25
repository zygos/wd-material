import { fetchTemperature, fetchWindSpeed } from '../shared/api';

const temperatureCache: Record<string, number> = {};

export async function fetchTemperatureCached(date: Date): Promise<number> {
  // unique cache key for each hour
  const cacheKey = date.toISOString().slice(0, 13);

  if (cacheKey in temperatureCache) {
    return temperatureCache[cacheKey];
  }

  let retries = 3;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const data = await fetchTemperature(date);
      temperatureCache[cacheKey] = data;
      return data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

const windSpeedCache: Record<string, number> = {};

export async function fetchWindSpeedCached(date: Date): Promise<number> {
  // unique cache key for each minute
  const cacheKey = date.toISOString().slice(0, 16);

  if (cacheKey in windSpeedCache) {
    return windSpeedCache[cacheKey];
  }

  let retries = 2;
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const data = await fetchWindSpeed(date);
      windSpeedCache[cacheKey] = data;
      return data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}
