type AsyncFunction = (...args: any[]) => any;

// version without recursion
export function withRetries<T extends AsyncFunction>(
  attemptsMax: number,
  fn: T,
) {
  return async function (
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>>> {
    if (attemptsMax < 1) {
      throw new Error('Number of attempts must be greater than 0');
    }

    let lastError: unknown;

    // For/while loops are generally not the best choice for async code.
    // In this case, they work fine because the await keyword "pauses"
    // the loop until the promise is resolved.
    for (let attempt = 0; attempt <= attemptsMax; attempt++) {
      try {
        return await (fn(...args) as ReturnType<T>);
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  };
}

export function withRetriesRecursive<T extends AsyncFunction>(
  attemptsMax: number,
  fn: T,
) {
  return async function (
    ...args: Parameters<T>
  ): Promise<Awaited<ReturnType<T>>> {
    if (attemptsMax < 1) {
      throw new Error('Number of attempts must be greater than 0');
    }

    try {
      return await (fn(...args) as ReturnType<T>);
    } catch (error) {
      if (attemptsMax === 1) throw error;

      return withRetriesRecursive(attemptsMax - 1, fn)(...args);
    }
  };
}
