// You can not edit this file! Assume it is a third-party library.

export type Weather = {
  temperatureC: number;
  humidity: number;
  wind: number;
};

export async function fetchByCity(city: string): Promise<Weather> {
  const response = await fetch(`https://api.weather.com/city/${city}`);

  return (await response.json()) as Weather;
}

export async function fetchByPostCode(postCode: string): Promise<Weather> {
  const response = await fetch(`https://api.weather.com/post-code/${postCode}`);

  return (await response.json()) as Weather;
}

export async function fetchByLatLong(
  lat: number,
  long: number,
): Promise<Weather> {
  const response = await fetch(
    `https://api.weather.com/lat-long/${lat}/${long}`,
  );

  return (await response.json()) as Weather;
}
