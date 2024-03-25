import { describe, it, expect, vi } from 'vitest'
import { listAnagrams, getAnagrams, getAnagramsStrict } from './anagrams-3'

describe('getAnagrams', () => {
  it('should list same word as anagram', () => {
    const results = getAnagrams(['testword'], 'testword')

    expect(results).toContain('testword')
  })

  it('should reject words that add new letters', () => {
    const results = getAnagrams(['testword', 'test'], 'test')

    expect(results).not.toContain('testword')
  })

  it('should list all anagrams', () => {
    const results = getAnagrams(['abc', 'bac'], 'abc')

    expect(results).toEqual(['abc', 'bac'])
  })

  it('should list anagrams that do not include every letter', () => {
    const results = getAnagrams(['abc', 'bac', 'ab'], 'abc')

    expect(results).toEqual(['abc', 'bac', 'ab'])
  })
})

describe('getAnagramsStrict', () => {
  it('should not list anagrams that do not contain all letters in a word', () => {
    const results = getAnagramsStrict(['abc', 'bac', 'ab'], 'abc')

    expect(results).toEqual(['abc', 'bac'])
  })
})

describe('listAnagrams', () => {
  it('should display results', () => {
    const logMock = vi.fn()

    const anagrams = getAnagrams(['abc', 'bac', 'trent'], 'cba')

    listAnagrams(logMock, anagrams, 'cba')

    expect(logMock.mock.calls).toEqual([
      ['There are 2 anagrams of cba in the dictionary'],
      ['abc'],
      ['bac'],
    ])
  })
})
