import { describe, expect, it } from 'vitest'
import divideAll from '.'

it('should return an empty array if the input array is empty', () => {
  const numbers: number[] = []
  const divisor = 10
  expect(divideAll(divisor, numbers)).toEqual([])
})

it('should throw an error when divisor is 0', () => {
  const numbers = [10, 20, 30]
  const divisor = 0
  expect(() => divideAll(divisor, numbers)).toThrow('Cannot divide by 0')
})

it('should divide each element in the array by the divisor', () => {
  const numbers = [10, 20, 30, 40]
  const divisor = 5
  expect(divideAll(divisor, numbers)).toEqual([2, 4, 6, 8])
})

it('should return only the whole result', () => {
  const numbers = [10, 15, 20, 21]
  const divisor = 3
  expect(divideAll(divisor, numbers)).toEqual([3, 5, 6, 7])
})

it('should work with negative elements', () => {
  const numbers = [-10, -20, -23]
  const divisor = 4
  expect(divideAll(divisor, numbers)).toEqual([-2, -5, -5])
})
