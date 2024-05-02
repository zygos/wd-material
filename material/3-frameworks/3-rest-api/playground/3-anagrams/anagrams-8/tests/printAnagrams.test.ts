import printAnagrams from '../src'
import { expect, it, vi } from 'vitest'

vi.spyOn(console, 'log');

it('should print anagrams from words.txt', async () => {
  await printAnagrams()

  expect(console.log).toHaveBeenCalledWith('There are 2 anagrams in the dictionary:')
  expect(console.log).toHaveBeenCalledWith('  - coed')
  expect(console.log).toHaveBeenCalledWith('  - deco')
})
