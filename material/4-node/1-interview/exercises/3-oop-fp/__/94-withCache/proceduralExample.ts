import { fetchTemperature } from '../shared/api';

// we could use a Map data structure as well
const temperatureCache: Record<string, number> = {};

export async function fetchTemperatureCached(date: Date): Promise<number> {
  // unique cache key for each hour
  const cacheKey = date.toISOString().slice(0, 13);

  if (cacheKey in temperatureCache) {
    return temperatureCache[cacheKey];
  }

  const data = await fetchTemperature(date);

  temperatureCache[cacheKey] = data;

  return data;
}
