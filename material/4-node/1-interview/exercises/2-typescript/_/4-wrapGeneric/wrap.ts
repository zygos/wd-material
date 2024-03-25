/**
 * Wraps a function inside a another function while preserving
 * the original function's behavior.
 * @param fn The function to wrap.
 * @returns The wrapped function.
 */
export function wrap(fn) {
  // Right now we have 3 issues:
  // 1. we call the original function only with a single argument
  // 2. TypeScript does not understand that the wrapped function
  //    can be invoked with the same arguments as the original function.
  // 3. TypeScript does not understand that the wrapped function
  //    returns the same result as the original function.

  return (a) => fn(a);
}
