import { expect, it, vi } from 'vitest'
import showAnagrams from './showAnagrams'

// no more mocking modules!
// now our test works with any getDictionary and print functions

it('should print a list of anagrams to the console found in the dictionary path', async () => {
  // vi.fn creates an auto-spied stub function that does not care about
  // inputs and returns nothing, perfect for our fake print function
  const print = vi.fn()

  await showAnagrams(
    () => ['dusty', 'word'],
    print,
    'study',
  )

  expect(print).toHaveBeenCalledWith('There is 1 anagram in the dictionary:\n  - dusty')
})