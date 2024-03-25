// While this works, it hides the underlying types of our underlying function.
// We would like to preserve the original function interface - the same arguments
// the same and return type in the retryable function.
export function withRetry(fn: Function) {
  return async function (...args: unknown[]) {
    try {
      return await fn(...args);
    } catch (error) {
      return await fn(...args);
    }
  };
}
