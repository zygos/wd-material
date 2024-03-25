type AsyncFunction = (...args: any[]) => any;

export function withFiveRetries<T extends AsyncFunction>(fn: T) {
  return async function (...args: Parameters<T>) {
    // TODO: Implement this function.
  };
}
