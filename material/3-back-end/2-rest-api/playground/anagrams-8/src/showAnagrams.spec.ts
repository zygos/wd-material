import { expect, it, vi } from 'vitest'
import showAnagrams from './showAnagrams'

vi.spyOn(console, 'log');

// Technically, this can be considered a stub, because we are
// providing a fake implementation of a module sufficient for our test.
// For mocking an entire module:
// we mock the fs/promises module by providing a function which returns
// a fake implementation of the module
vi.mock('fs/promises', () => ({
  // Here we are mocking 2 different parts of our module.
  // We would not necessarily need to mock both of them. But we are doing it
  // to keep our test isolated from a change of import style:
  // - import fs from 'fs/promises'     // using import the default export
  // - import { readFile } from 'fs/promises'   // importing a named export
  default: {
    readFile: async () => 'dusty\nstudy',
  },

  // when doing import { readFile } from 'fs/promises', we will get this function
  readFile: async () => 'dusty\nstudy',
}))

it('should print a list of anagrams to the console found in the dictionary path', async () => {
  await showAnagrams('./not-actual-file.txt', 'study');

  expect(console.log).toHaveBeenCalledWith('There is 1 anagram in the dictionary:');
  expect(console.log).toHaveBeenCalledWith('  - dusty');
})
