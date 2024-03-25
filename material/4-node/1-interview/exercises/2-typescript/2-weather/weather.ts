import {
  type Weather,
  fetchByCity,
  fetchByPostCode,
  fetchByLatLong,
} from './externalWeatherPackage';

type WeatherWithFahrenheit = Weather & { temperatureF: number };

// TODO: Implement withFahrenheit function and
// refactor the following functions to use it
// instead of duplicating the common logic.
function withFahrenheit() {}

export async function fetchWeatherByCity(
  city: string,
): Promise<WeatherWithFahrenheit> {
  const weather = await fetchByCity(city);

  return {
    ...weather,
    temperatureF: weather.temperatureC * 1.8 + 32,
  };
}

export async function fetchWeatherByPostCode(
  postCode: string,
): Promise<WeatherWithFahrenheit> {
  const weather = await fetchByPostCode(postCode);

  return {
    ...weather,
    temperatureF: weather.temperatureC * 1.8 + 32,
  };
}

export async function fetchWeatherByLatLong(
  lat: number,
  long: number,
): Promise<WeatherWithFahrenheit> {
  const weather = await fetchByLatLong(lat, long);

  return {
    ...weather,
    temperatureF: weather.temperatureC * 1.8 + 32,
  };
}
