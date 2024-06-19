Prepare an exercise for a live coding interview for a Node.js position. Here are a few examples:

## User authentication system

```ts
/**
 * We will mimick an authentication system with a simple class. You can see the initial
 * implementation below.
 *
 * Tasks:
 * 1. Some users sign up with very weak passwords. Please validate the password length,
 *    so it has to be between 8 and 32 characters.
 * 2. Ensure that the email is unique when registering a new user.
 * 3. It seems that the current data structure for storing users is not the best for heavy
 *    read operations. How would you change it?
 * 4. Bonus. Pretend that you have some hashing function (you can create a new function
 *    that performs any string manipulation). How would you adapt the AuthSystem to use it?
 *
 * --- --- ---
 * Passing: 3/4 tasks done.
*/

type User = {
  email: string;
  password: string;
}

class AuthSystem {
  private users: User[];

  constructor() {
    this.users = [];
  }

  register(email: string, password: string): void {
    this.users.push({ email, password });
  }

  login(email: string, password: string): boolean {
    return this.users.some(user => user.email === email && user.password === password);
  }

  getUsers(): User[] {
    return this.users;
  }
}
```

## LRU

```ts
/**
 *
 * Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.
 *
 * - get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return undefined.
 * - put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.
 *
 * The cache is initialized with a positive capacity. Once the cache reaches its capacity, it should invalidate the least recently used item before inserting a new item.
 *
 * Example:
 * ```
 * const cache = new LRUCache<number, string>(2)
 * cache.set(1, 'a')
 * cache.set(2, 'b')
 * cache.get(1)       // returns 'a'
 * cache.set(3, 'c')  // evicts key 2
 * cache.get(2)       // returns undefined (not found)
 * cache.get(3)       // returns 'c'
 */
```

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
```
