import { expect, it, vi } from 'vitest'
import displayAnagrams from './displayAnagrams'

const display = vi.fn()

it('should display results', () => {
  displayAnagrams(display, 'cba', ['abc', 'bac'])

  expect(display.mock.calls).toEqual([
    ['There are 2 anagrams of cba in the dictionary'],
    ['abc'],
    ['bac'],
  ])
})
