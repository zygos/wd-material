## Problem

Imagine some 3rd party package that exports the following functions:

- fetchByCity(city: string): Weather
- fetchByPostCode(postCode: string): Weather
- fetchByLatLong(lat: number, long: number): Weather

These functions return a Weather object with temperature in Celsius. We want to add Fahrenheit to the return value.

Right now, we are manually wrapping each of these functions with a new function that adds the Fahrenheit temperature. This has a few problems:

- a lot of boilerplate code for a simple task
- if we want to add more functionality, for example, adding "feels like" temperature, we have to change our code in many places

Would it be possible to create a function that would "produce" these new functions for us instead of writing them manually?

## Task

Refactor the code in `weather.ts` to use a function wrapper `withFahrenheit`, which adds the Fahrenheit temperature to the return value of the original function.

The wrapper should still pass the same tests as before and should not result in any type errors.

Example usage:

```ts
// Instead of:
export async function fetchWeatherByCity(
  city: string,
): Promise<WeatherWithFahrenheit> {
  const weather = await fetchByCity(city);

  return {
    ...weather,
    temperatureF: weather.temperatureC * 1.8 + 32,
  };
}
// ...

// You should have:
const fetchWeatherByCity = withFahrenheit(fetchWeatherByCity);
// ...

// withFahrenheit should capture all repetitive logic
```

`fetchWeatherByCity` should accept the same arguments as `fetchByCity` and return the same value as `fetchWeatherByCity` but with the `temperatureF` property added.

The same should be done for `fetchByPostCode` and `fetchByLatLong`.

## Recommended steps to solve this exercise

1. Start with a naive solution in pure JavaScript and ignore the type errors. Passes provided behavior tests.
2. Refactor the JS solution, if necessary.
3. Add TypeScript type annotations for arguments and return values.
4. Use generics to ensure all functions pass `TypeTest` statements in the provided tests.

NOTE: In practice, 2 - 3 repetitions of non-interdependent code blocks are not a big deal. However, often, we have many more code repetitions, or the code requires a lot more repetitive logic than just adding a single property to an object. In these cases, it is a good idea to refactor the code to use a function wrapper.
