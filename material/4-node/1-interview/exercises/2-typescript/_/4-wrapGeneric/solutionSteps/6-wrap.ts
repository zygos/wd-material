type AnyFunction = (...args: never[]) => unknown;

/**
 * Wraps a function inside a another function while preserving
 * the original function's behavior.
 * @param fn The function to wrap.
 * @returns The wrapped function.
 */
export function wrap<T extends AnyFunction>(fn: T) {
  return (...args: Parameters<T>) => {
    return fn(...args) as ReturnType<T>;
  };
}

// This already works pretty well and should pass all main test cases.

// As a bonus, we can consider supporting overloads - functions
// supporting multiple signatures.

// TypeScript has a hard time understanding that our wrapped function could
// have the same overloads as the original function. We can fix this by using
// a type assertion to assert that the entire (...args) => ... expression is
// of type T.
