import { expect, it } from 'vitest'
import calculateTotalPrice from '.'

it('should return 0 if there are no items', () => {
  const items = []
  expect(calculateTotalPrice(items)).toBe(0)
})

it('should calculate the total price of items', () => {
  const items = [
    { name: 'item1', price: 10 },
    { name: 'item2', price: 20 },
    { name: 'item3', price: 30 },
  ]
  expect(calculateTotalPrice(items)).toBe(60)
})
