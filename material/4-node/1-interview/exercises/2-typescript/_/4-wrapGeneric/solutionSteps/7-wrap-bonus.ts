type AnyFunction = (...args: never[]) => unknown;

/**
 * Wraps a function inside a another function while preserving
 * the original function's behavior.
 * @param fn The function to wrap.
 * @returns The wrapped function.
 */
export function wrap<T extends AnyFunction>(fn: T): T {
  return ((...args: Parameters<T>) => {
    return fn(...args) as ReturnType<T>;
  }) as T;
}

// This would not be a perfect solution as we could have a function that has
// some methods in its prototype or would rely on "this", but this is a very
// rare case for most functions and we would like to keep the solution simple.
