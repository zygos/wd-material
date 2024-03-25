export function withRetry(fn: Function) {
  return async function (...args: unknown[]) {
    try {
      return await fn(...args);
    } catch (error) {
      // TODO: if we catch an error, we should try again
    }
  };
}
