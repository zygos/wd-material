type AsyncFunction = (...args: any[]) => any;

export function withRetries<T extends AsyncFunction>(retries: number, fn: T) {
  return async function (
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>>> {
    if (retries < 0) {
      throw new Error('Number of attempts can not be negative');
    }

    let lastError: unknown;

    // For/while loops are generally not the best choice for async code.
    // In this case, they work fine because the await keyword "pauses"
    // the loop until the promise is resolved.
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await (fn(...args) as ReturnType<T>);
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  };
}

// version with recursion
export function withRetriesRecursive<T extends AsyncFunction>(
  retries: number,
  fn: T,
) {
  return async function (
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>>> {
    if (retries < 0) {
      throw new Error('Number of attempts can not be negative');
    }

    try {
      return await (fn(...args) as ReturnType<T>);
    } catch (error) {
      if (!retries) throw error;

      return withRetriesRecursive(retries - 1, fn)(...args);
    }
  };
}
