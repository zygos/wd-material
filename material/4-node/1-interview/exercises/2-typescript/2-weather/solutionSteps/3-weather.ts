import {
  type Weather,
  fetchByCity,
  fetchByPostCode,
  fetchByLatLong,
} from './externalWeatherPackage';

type WeatherWithFahrenheit = Weather & { temperatureF: number };
type WeatherFunction = (...args: any[]) => Promise<Weather>;

function withFahrenheit(fetchWeather: WeatherFunction) {
  return async (...args): Promise<WeatherWithFahrenheit> => {
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
