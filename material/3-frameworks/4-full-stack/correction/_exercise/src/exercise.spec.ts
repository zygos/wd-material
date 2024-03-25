import { it, expect } from 'vitest'
import { feeCalculatorAlt } from '.'

it('should calculate correctly', async () => {
  const totalFee = feeCalculatorAlt(new Date('2024-01-16'), [
    new Date('2024-01-13'),
    new Date('2024-01-10'),
  ])

  expect(totalFee).toEqual(2.5)
})

it('should calculate correctly', async () => {
  const totalFee = feeCalculatorAlt(new Date('2024-01-16'), [new Date('2024-01-13')])

  expect(totalFee).toEqual(0.75)
})

it('should calculate correctly', async () => {
  const totalFee = feeCalculatorAlt(new Date('2024-01-16'), [new Date('2024-01-10')])

  expect(totalFee).toEqual(1.75)
})
