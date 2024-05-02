import fizzbuzz from '.'
import { expect, describe, it } from 'vitest'

describe('fizzbuzz', () => {
  const hundred = fizzbuzz(100)

  it('has the provided number of items', () => {
    expect(fizzbuzz(5)).toHaveLength(5)
    expect(fizzbuzz(10)).toHaveLength(10)
    expect(fizzbuzz(80)).toHaveLength(80)
    expect(hundred).toHaveLength(100)
  })

  it('has first non-multiples of 3 and 5 as numbers', () => {
    expect(hundred[0]).toEqual('1')
    expect(hundred[1]).toEqual('2')
    expect(hundred[3]).toEqual('4')
    expect(hundred[42]).toEqual('43')
    expect(hundred[75]).toEqual('76')
  })

  it('has every 3rd element as Fizz', () => {
    expect(hundred[2]).toEqual('Fizz')
    expect(hundred[8]).toEqual('Fizz')
    expect(hundred[98]).toEqual('Fizz')
  })

  it('has every 5th element as Buzz', () => {
    expect(hundred[4]).toEqual('Buzz')
    expect(hundred[19]).toEqual('Buzz')
    expect(hundred[99]).toEqual('Buzz')
  })

  it('has every 15th element as FizzBuzz', () => {
    expect(hundred[14]).toEqual('FizzBuzz')
    expect(hundred[44]).toEqual('FizzBuzz')
    expect(hundred[89]).toEqual('FizzBuzz')
  })
})
