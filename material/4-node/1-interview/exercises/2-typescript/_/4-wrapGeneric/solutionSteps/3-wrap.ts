type AnyFunction = (...args: unknown[]) => unknown;

/**
 * Wraps a function inside a another function while preserving
 * the original function's behavior.
 * @param fn The function to wrap.
 * @returns The wrapped function.
 */
export function wrap(fn: AnyFunction) {
  return (...args) => fn(...args);
}

// We have added a type for our `fn` parameter. This type is a function
// that takes any number of unknown arguments and returns an unknown value.
// This is a good start. Now we want to let TypeScript know that the return
// value of our wrapped function should be the same as the return value of
// the original function. We can do this by adding a return type to our
// `wrap` function.
// TODO: Add a return type to the `wrap` function.
