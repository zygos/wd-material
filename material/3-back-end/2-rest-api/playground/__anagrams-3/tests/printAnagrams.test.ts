import printAnagrams from '../src'
import { expect, it, vi } from 'vitest';

vi.spyOn(console, 'log');

it('should print anagrams from words.txt', async () => {
  const message = [
    `There are 2 anagrams in the dictionary:`,
    `  - coed`,
    `  - deco`,
  ].join('\n')

  await printAnagrams()

  expect(console.log).toHaveBeenCalledOnce()
  expect(console.log).toHaveBeenCalledWith(message)
})
