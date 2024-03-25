type AsyncFunction = (...args: any[]) => any;

export function withFiveRetries<T extends AsyncFunction>(fn: T) {
  return async function (...args: Parameters<T>) {
    let retries = 5;
    let lastError: unknown;

    // For/while loops are generally not the best choice for async code.
    // In this case, they work fine because the await keyword "pauses"
    // the loop until the promise is resolved.
    while (retries-- >= 0) {
      try {
        return await fn(...args);
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  };
}
