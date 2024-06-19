import { assertError } from '../errors'

it('should not throw an error if input is an instance of Error', () => {
  const error = new Error('Test error')
  expect(() => assertError(error)).not.toThrow()
})

it('should throw an error if input is not an instance of Error', () => {
  const error = 'Test error'
  expect(() => assertError(error)).toThrow()
})
