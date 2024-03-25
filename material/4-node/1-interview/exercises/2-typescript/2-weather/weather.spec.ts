import { expect, it, vi } from 'vitest';
import type { Expect, Equal } from 'type-testing';
import {
  fetchWeatherByCity,
  fetchWeatherByPostCode,
  fetchWeatherByLatLong,
} from './weather';

vi.stubGlobal('fetch', async () => ({
  ok: true,
  json: async () => ({
    temperatureC: 20,
    humidity: 80,
    wind: 5,
  }),
}));

it('fetches weather by city with fahrenheit', async () => {
  const weather = await fetchWeatherByCity('London');

  type TypeTest = Expect<
    Equal<Parameters<typeof fetchWeatherByCity>, [string]>
  >;

  expect(weather).toEqual({
    temperatureC: 20,
    humidity: 80,
    wind: 5,
    temperatureF: 68,
  });
});

it('fetches weather by post code with fahrenheit', async () => {
  const weather = await fetchWeatherByPostCode('SW1A 1AA');

  type TypeTest = Expect<
    Equal<Parameters<typeof fetchWeatherByPostCode>, [string]>
  >;

  expect(weather).toEqual({
    temperatureC: 20,
    humidity: 80,
    wind: 5,
    temperatureF: 68,
  });
});

it('fetches weather by lat long with fahrenheit', async () => {
  const weather = await fetchWeatherByLatLong(51.5074, 0.1278);

  type TypeTest = Expect<
    Equal<Parameters<typeof fetchWeatherByLatLong>, [number, number]>
  >;

  expect(weather).toEqual({
    temperatureC: 20,
    humidity: 80,
    wind: 5,
    temperatureF: 68,
  });
});
