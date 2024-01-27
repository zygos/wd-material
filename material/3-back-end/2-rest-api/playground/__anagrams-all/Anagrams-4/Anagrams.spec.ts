import { it, expect, vi } from 'vitest'
import Anagrams from './Anagrams'

it('should list same word as anagram', () => {
  const anagrams = new Anagrams(['testword'])

  expect(anagrams.getAnagrams('testword')).toContain('testword')
})

it('should reject words that add new letters', () => {
  const anagrams = new Anagrams(['testword', 'test'])

  expect(anagrams.getAnagrams('test')).not.toContain('testword')
})

it('should list all anagrams', () => {
  const anagrams = new Anagrams(['abc', 'bac'])

  expect(anagrams.getAnagrams('abc')).toEqual(['abc', 'bac'])
})
