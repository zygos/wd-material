/**
 * Adds a table name prefix to each key in an array of keys.
 *
 * @param tableName - The prefix to be added to each key.
 * @param keys - An array of keys.
 * @returns An array of strings with the prefix added to each key.
 * @example
 * ```ts
 * prefixTable('users', ['id', 'name']) // ['users.id', 'users.name']
 * ```
 */
export function prefixTable<T extends object, P extends string>(
  tableName: P,
  keys: readonly (keyof T)[]
) {
  return keys.map(
    (key) => `${tableName}.${String(key)}`
  ) as Array<`${P}.${Extract<keyof T, string>}`>
}
