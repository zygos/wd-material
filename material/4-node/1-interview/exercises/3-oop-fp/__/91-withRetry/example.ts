import { fetchTemperature, fetchWindSpeed } from '../shared/api';
import { withRetry } from './withRetry';

export const fetchTemperatureCached = withRetry(fetchTemperature);
export const fetchWindSpeedCached = withRetry(fetchWindSpeed);
