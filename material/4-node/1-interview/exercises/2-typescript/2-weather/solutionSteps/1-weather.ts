import {
  type Weather,
  fetchByCity,
  fetchByPostCode,
  fetchByLatLong,
} from './externalWeatherPackage';

type WeatherWithFahrenheit = Weather & { temperatureF: number };

function withFahrenheit(fetchWeather) {
  return async (first, second, third) => {
    const weather = await fetchWeather(first, second, third);

    return {
      ...weather,
      temperatureF: weather.temperatureC * 1.8 + 32,
    };
  };
}

export const fetchWeatherByCity = withFahrenheit(fetchByCity);
export const fetchWeatherByPostCode = withFahrenheit(fetchByPostCode);
export const fetchWeatherByLatLong = withFahrenheit(fetchByLatLong);
