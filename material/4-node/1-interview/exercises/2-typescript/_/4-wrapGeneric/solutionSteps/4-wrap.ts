type AnyFunction = (...args: unknown[]) => unknown;

/**
 * Wraps a function inside a another function while preserving
 * the original function's behavior.
 * @param fn The function to wrap.
 * @returns The wrapped function.
 */
export function wrap(fn: AnyFunction): AnyFunction {
  return (...args) => fn(...args);
}

// We have added the return type, but does it really
// communicate what this function does?
// This informs TypeScript that we take in some function
// and return some function, but not necessarily of the
// same type. We can do better by using generics.
// With a generic we can express that our wrapped function
// is not just AnyFunction, but it is of the same type as
// the function we are wrapping.
// TODO: using generics, inform TypeScript that the return
// value of our `wrap` function should be the same as the fn
// parameter.
