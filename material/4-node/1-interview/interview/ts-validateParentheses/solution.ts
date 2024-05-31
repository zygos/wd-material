## Validate Parentheses

Implement a function that validates if the parentheses in a string are balanced.

```ts
/**
 * Implement a function `hasValidParentheses` that validates if the parentheses in a string are balanced.
 *
 * Example:
 * ```
 * hasValidParentheses('()');  // returns true
 * hasValidParentheses('()[]{}');  // returns true
 * hasValidParentheses('(]');  // returns false
 * hasValidParentheses('([)]');  // returns false
 * hasValidParentheses('{[]}');  // returns true
 * ```
 *
 * The function should return true if the string contains balanced parentheses, brackets, and braces.
 */

// Solution
function hasValidParentheses(s: string): boolean {
  const stack: string[] = [];
  const map: { [key: string]: string } = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  for (let char of s) {
    if (map[char]) {
      stack.push(map[char]);
    } else if (stack.length > 0 && stack[stack.length - 1] === char) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length === 0;
}
```
