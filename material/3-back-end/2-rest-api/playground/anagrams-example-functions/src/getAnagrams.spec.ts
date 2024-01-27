import { expect, it } from 'vitest'
import buildGetAnagrams from './getAnagrams'

const getAnagrams = buildGetAnagrams(['dusty', 'night'])

it('should return an array of anagrams for the given word', () => {
  expect(getAnagrams('study')).toEqual(['dusty'])
  expect(getAnagrams('thing')).toEqual(['night'])
})

it('should return an empty array if there are no anagrams', () => {
  expect(getAnagrams('coding')).toEqual([])
})

it('should return an empty array if the dictionary is empty', () => {
  const dictionary = [] as string[]
  const getAnagramsEmpty = buildGetAnagrams(dictionary)

  expect(getAnagramsEmpty('study')).toEqual([])
})

it('should return an empty array if the word is empty', () => {
  expect(getAnagrams('')).toEqual([])
})

it('should not include partial anagrams', () => {
  expect(getAnagrams('dust')).toEqual([])
  expect(getAnagrams('dustyy')).toEqual([])
})

it('should not include the word itself', () => {
  expect(getAnagrams('dusty')).toEqual([])
})
