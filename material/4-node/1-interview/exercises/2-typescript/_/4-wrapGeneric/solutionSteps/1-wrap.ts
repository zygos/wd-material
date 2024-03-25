/**
 * Wraps a function inside a another function while preserving
 * the original function's behavior.
 * @param fn The function to wrap.
 * @returns The wrapped function.
 */
export function wrap(fn) {
  // returns a wrapped function
  // which takes some arguments, let's say 3
  // and calls the original function with those arguments
  // TODO: make this work for any number of arguments.
  // How could you accept and pass any number of arguments?
  return (a, b, c) => fn(a, b, c);
}
