import { beforeAll, beforeEach, afterAll, afterEach, expect, it } from 'vitest'
import { server } from './mocks/server.mock'
import fetchImages from './'

it('returns an array of images', async () => {
  const images = await fetchImages()

  expect(images).toHaveLength(2)
  expect(images[0].description).toBe('A cat')
  expect(images[1].description).toBe('A dog')
})

// mocking server requests is often quite a hassle:

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

beforeEach(() => {
  // fix issue with URL resolution from simulated browser environment
  location.replace('https://localhost')
})

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
