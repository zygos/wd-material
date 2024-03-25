import {
  type Weather,
  fetchByCity,
  fetchByPostCode,
  fetchByLatLong,
} from './externalWeatherPackage';

type WeatherWithFahrenheit = Weather & { temperatureF: number };
type WeatherFunction = (...args: any[]) => Promise<Weather>;

function withFahrenheit<T extends WeatherFunction>(fetchWeather: T) {
  return async (...args: Parameters<T>): Promise<WeatherWithFahrenheit> => {
    const weather = await fetchWeather(...args);

    return {
      ...weather,
      temperatureF: weather.temperatureC * 1.8 + 32,
    };
  };
}

export const fetchWeatherByCity = withFahrenheit(fetchByCity);
export const fetchWeatherByPostCode = withFahrenheit(fetchByPostCode);
export const fetchWeatherByLatLong = withFahrenheit(fetchByLatLong);
