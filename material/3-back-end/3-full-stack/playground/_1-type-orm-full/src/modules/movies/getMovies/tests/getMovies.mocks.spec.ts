import { In } from 'typeorm'
import getMoviesFactory from '..'

const moviesRepository = vi.mocked({
  find: vi.fn(() => []),
} as any)

const getMovies = getMoviesFactory(moviesRepository)

beforeEach(() => {
  moviesRepository.find.mockReset()
})

// When mocking internal dependencies, we are exposing our
// test to implementation details. Not ideal. This type of
// test is unrealistic to write up-front for anything beyond
// tiny problems as we would need to know how we will interact
// with our dependencies before we start writing our implementation.
it('should return movies by a list of query params', async () => {
  await getMovies({
    query: {
      ids: '88763,816692',
    },
  } as any)

  expect(moviesRepository.find).toBeCalledWith({
    where: {
      id: In([88763, 816692]),
    },
  })
})
