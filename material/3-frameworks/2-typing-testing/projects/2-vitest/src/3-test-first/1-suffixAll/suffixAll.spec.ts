import { expect, it } from 'vitest'
import suffixAll from '.'

it('appends a string to all provided strings', () => {
  // add the necessary implementation in the `suffixAll` to make this test pass.
  expect(suffixAll(' GB', ['16', '32'])).toEqual(['16 GB', '32 GB'])
})
