import { it, expect, vi } from 'vitest'
import Anagrams from './Anagrams-class-3'

const displayMock = () => vi.fn()

it('should list same word as anagram', () => {
  const anagrams = new Anagrams(['testword'], displayMock())

  expect(anagrams.listAnagrams('testword')).toContain('testword')
})

it('should reject words that add new letters', () => {
  const anagrams = new Anagrams(['testword', 'test'], displayMock())

  expect(anagrams.listAnagrams('test')).not.toContain('testword')
})

it('should list all anagrams', () => {
  const anagrams = new Anagrams(['abc', 'bac'], displayMock())

  expect(anagrams.listAnagrams('abc')).toEqual(['abc', 'bac'])
})

it('should display results', () => {
  const display = displayMock()
  const anagrams = new Anagrams(['abc', 'bac', 'trent'], display)

  anagrams.listAnagrams('cba')

  expect(display.mock.calls).toEqual([
    ['There are 2 anagrams of cba in the dictionary'],
    ['abc'],
    ['bac'],
  ])
})
