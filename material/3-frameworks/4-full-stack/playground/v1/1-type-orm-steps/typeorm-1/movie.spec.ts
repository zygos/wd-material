import { createInMemoryDatabase } from '@tests/utils/database'
import { Movie } from './movie'

const db = await createInMemoryDatabase({ entities: [Movie] })
const movieRepository = db.getRepository(Movie)

it('should create a movie', async () => {
  await movieRepository.save({
    title: 'The Shawshank Redemption',
    year: 1994,
  })

  const movieSaved = await movieRepository.findOneBy({
    title: 'The Shawshank Redemption',
  })

  expect(movieSaved).toMatchObject({
    id: expect.any(Number),
    title: 'The Shawshank Redemption',
    year: 1994,
  })
})
