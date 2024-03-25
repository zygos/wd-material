type AnyFunction = (...args: unknown[]) => unknown;

/**
 * Wraps a function inside a another function while preserving
 * the original function's behavior.
 * @param fn The function to wrap.
 * @returns The wrapped function.
 */
export function wrap<T extends AnyFunction>(fn: T) {
  return (...args) => fn(...args);
}

// We have informed TS that the return value of our `wrap` function
// should is the same as the `fn` parameter. However, it
// does not understand that we are actually returning a function
// which matches the type of the `fn` parameter.
// TODO: specify that ...args are always Parameters<F> and that
// fn(...args) is always ReturnType<F>.
