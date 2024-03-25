import { fetchTemperature, fetchWindSpeed } from '../shared/api';
import { withRetries } from './withRetries';

// Expected usage example. withRetries wraps any given function
// and caches its results.

// The idea is that we can separate the retrying functionality from the
// main function. This way, the each function is responsible for its own
// logic.
// We could plug-in this functionality into other functions, even other
// projects without needing to touch the original functions.
// A single developer could be responsible for the retrying functionality,
// and no one else would need to separately implement it.

// This is also a very similar concept to the decorator pattern in OOP!
export const fetchTemperatureCached = withRetries(2, fetchTemperature);
export const fetchWindSpeedCached = withRetries(3, fetchWindSpeed);
