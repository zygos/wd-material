/**
 * Wraps a function inside a another function while preserving
 * the original function's behavior.
 * @param fn The function to wrap.
 * @returns The wrapped function.
 */
export function wrap(fn) {
  return (...args) => fn(...args);
}

// Great! This is pretty much the final solution in JS terms.
// However, this is a TS challenge, and this solution is not
// type safe. Let's make it type safe so it preserves the
// original function's type.
// TODO: add a type for the `fn` parameter.
