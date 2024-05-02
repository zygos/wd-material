import { setupServer } from 'msw/node'
import { rest } from 'msw'

const images = [
  { id: 1, url: '/images/1', description: ' A  cat' },
  { id: 2, url: '/images/2', description: '##A dog' },
]

// https://vitest.dev/guide/mocking.html#requests
const handlers = [
  rest.get('https://some-api.com/images', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(images))
  }),
]

export const server = setupServer(...handlers)
