type AsyncFunction = (...args: unknown[]) => unknown;

/**
 * Wraps a function to retry it if it fails.
 * @param fn The function to wrap.
 * @returns A new function that will retry the original function if it fails.
 */
export function withRetry<T extends AsyncFunction>(fn: T) {
  return async function (
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>>> {
    try {
      return await (fn(...args) as ReturnType<T>);
    } catch (error) {
      return await (fn(...args) as ReturnType<T>);
    }
  };
}
