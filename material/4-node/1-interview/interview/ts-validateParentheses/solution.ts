function hasValidParentheses(s: string): boolean {
  const stack: string[] = [];

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

const map: { [key: string]: string } = {
  '(': ')',
  '[': ']',
  '{': '}',
};