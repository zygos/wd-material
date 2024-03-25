import { fetchTemperature } from '../shared/api';
import { withCache } from './withCache';
import { withRetries } from './withRetries';

// Expected usage example. withCache wraps any given function
// and caches its results.

const byDay = (date: Date) => date.toISOString().slice(0, 10);
const byHour = (date: Date) => date.toISOString().slice(0, 13);

// The idea is that we can separate the caching functionality from the
// retrying functionality and combine them as needed.
// We could plug-in this functionality into other functions, other projects
// without needing to touch the original functions.
// A single developer could be responsible for the caching functionality,
// and no one else would need to separately implement it.

// This is also a very similar concept to the decorator pattern in OOP!
const fetchTemperatureRetried = withRetries(5, fetchTemperature);
const fetchTemperatureCachedByDay = withCache(byDay, fetchTemperature);
const fetchTemperatureCachedByHour = withCache(byHour, fetchTemperature);

// Of course, we do not need to have such long names if we do not need
// to differentiate between different configurations. This is just for
// demonstration purposes.
const fetchTemperatureRetriedCached = withCache(
  byHour,
  fetchTemperatureRetried,
);
