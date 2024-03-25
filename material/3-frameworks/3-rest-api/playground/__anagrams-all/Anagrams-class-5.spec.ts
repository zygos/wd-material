import { describe, it, expect, vi } from 'vitest'
import Anagrams from './Anagrams-class-5'

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

it('should list same word as anagram', () => {
  const anagrams = new Anagrams(['testword'])

  expect(anagrams.getAnagrams('testword')).toContain('testword')
})

describe('getting strict anagrams', () => {
  it('should not list anagrams that do not contain all letters in a word', () => {
    const anagrams = new Anagrams(['abc', 'bac', 'ab'], true)

    expect(anagrams.getAnagrams('abc')).toEqual(['abc', 'bac'])
  })
})

it('should display results', () => {
  const display = vi.fn()
  const anagrams = new Anagrams(['abc', 'bac', 'trent'])

  anagrams.listAnagrams('cba', display)

  expect(display.mock.calls).toEqual([
    ['There are 2 anagrams of cba in the dictionary'],
    ['abc'],
    ['bac'],
  ])
})
