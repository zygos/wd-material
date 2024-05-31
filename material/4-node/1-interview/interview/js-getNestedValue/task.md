```ts
/**
 * Implement a function `getNestedValue` that retrieves a value from a nested object using a dot-separated path.
 * If the path doesn't exist or if any intermediate property is undefined, return undefined.
 *
 * Example:
 * ```
 * const obj = {
 *   person: {
 *     name: 'John',
 *     age: 30,
 *     address: {
 *       city: 'New York',
 *       country: 'USA'
 *     }
 *   }
 * };
 *
 * getNestedValue(obj, 'person.name');          // returns 'John'
 * getNestedValue(obj, 'person.address.city');  // returns 'New York'
 * getNestedValue(obj, 'person.email');         // returns undefined
 * getNestedValue(obj, 'person.hobbies.0');     // returns undefined
 * ```
 *
 * It should handle nested objects and arrays. It should return only properties
 * that are directly on the object, not inherited from the prototype chain.
 */
```
