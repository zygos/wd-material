import { expect, it } from 'vitest'
import extractCountryCodes from '.'

it('should return an empty array for an empty string', () => {
  expect(extractCountryCodes('')).toEqual([])
})

it('should return an empty array when there are no phone numbers', () => {
  const text = 'Lorem ipsum dolor sit amet 123.'

  expect(extractCountryCodes(text)).toEqual([])
})

it('should return a list of country codes of listed phone numbers', () => {
  const text = 'To buy a sofa, call +44 567890 or +380 123456'

  expect(extractCountryCodes(text)).toEqual(['+44', '+380'])
})

it.skip('should ignore simple mathematical equations', () => {
  // --> start here. Remove .skip above and write your test(s)
  // you can assume that the country codes always have a space before and after them.
  // const text = 'We can calculate 40+44=84'
})
