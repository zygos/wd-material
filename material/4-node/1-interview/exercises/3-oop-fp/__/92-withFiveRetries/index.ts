import { fetchTemperature, fetchWindSpeed } from '../shared/api';
import { withFiveRetries } from './withFiveRetries';

export const fetchTemperatureCached = withFiveRetries(fetchTemperature);
export const fetchWindSpeedCached = withFiveRetries(fetchWindSpeed);
