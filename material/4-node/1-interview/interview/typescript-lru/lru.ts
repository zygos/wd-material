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

class LRUCache<K, V> {
  private capacity: number
  private cache: Map<K, V>

  constructor(capacity: number) {
    this.capacity = capacity
    this.cache = new Map()
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      return undefined
    }

    const value = this.cache.get(key)!

    this.cache.delete(key)
    this.cache.set(key, value)

    return value
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    if (this.cache.size === this.capacity) {
      this.cache.delete(this.cache.keys().next().value)
    }

    this.cache.set(key, value)
  }
}
