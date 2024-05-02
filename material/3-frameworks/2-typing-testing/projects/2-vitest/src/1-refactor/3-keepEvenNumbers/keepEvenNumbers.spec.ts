import { expect, it } from 'vitest'
import keepEvenNumbers from '.'

it('should return an array with only even numbers', () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  expect(keepEvenNumbers(numbers)).toEqual([2, 4, 6, 8, 10])
})

it('should return an empty array if no even numbers are present', () => {
  const numbers = [1, 3, 5, 7, 9]
  expect(keepEvenNumbers(numbers)).toEqual([])
})
