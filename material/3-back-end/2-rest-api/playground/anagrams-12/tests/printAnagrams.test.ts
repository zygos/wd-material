import printAnagrams from '../src'
import { expect, it, vi } from 'vitest';

const consoleSpy = vi.spyOn(console, 'log');

// no mocks, does it work with the real file?
it('should print anagrams from words.txt', async () => {
  const message = [
    `There are 2 anagrams in the dictionary:`,
    `  - coed`,
    `  - deco`,
  ].join('\n')

  await printAnagrams()

  expect(consoleSpy).toHaveBeenCalledOnce()
  expect(consoleSpy).toHaveBeenCalledWith(message)
})
