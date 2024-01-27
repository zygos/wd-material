import { createInMemoryDatabase } from '@tests/utils/database'
import { Movie } from '@server/database'
import supertest from 'supertest'
import createApp from '@server/app'

const db = await createInMemoryDatabase()
const moviesRepository = db.getRepository(Movie)
const app = createApp(db)

// Here, we are testing our endpoint - how our movies endpoints are
// integrated within the environment it is being used with. We are not
// even importing our getMovies module, we are working with our app
// as a whole.

await moviesRepository.save([
  {
    id: 88763,
    title: 'Back to the Future',
    year: 1985,
    directors: [
      {
        id: 2,
        name: 'Robert Zemeckis',
        birth: 1952,
      },
    ],
    rating: {
      votes: 1_260_000,
      rating: 8.5,
    },
    stars: [
      {
        id: 3,
        name: 'Michael J. Fox',
        birth: 1961,
      },
      {
        id: 4,
        name: 'Christopher Lloyd',
        birth: 1938,
      },
    ],
  },
  {
    id: 102926,
    title: 'The Silence of the Lambs',
    year: 1991,
    directors: [
      {
        id: 1,
        name: 'Jonathan Demme',
        birth: 1944,
      },
    ],
  },
  {
    id: 816692,
    title: 'Interstellar',
    year: 2014,
    stars: [
      {
        id: 5,
        name: 'Matthew McConaughey',
        birth: 1969,
      },
      {
        id: 6,
        name: 'Anne Hathaway',
        birth: 1982,
      },
    ],
  },
])

describe('GET /movies', () => {
  it('should return movies by a list of query params', async () => {
    const { body } = await supertest(app)
      .get('/movies?ids=88763,816692')
      .expect(200)

    expect(body).toEqual([
      {
        id: 88763,
        title: 'Back to the Future',
        year: 1985,
      },
      {
        id: 816692,
        title: 'Interstellar',
        year: 2014,
      },
    ])
  })
})

describe('GET /movies/:id', () => {
  it('should return a movie by id with its rating, directors and stars', async () => {
    const { body } = await supertest(app).get('/movies/88763').expect(200)

    expect(body).toEqual({
      id: 88763,
      title: 'Back to the Future',
      year: 1985,
      rating: {
        movieId: 88763,
        votes: 1_260_000,
        rating: 8.5,
      },
      directors: [
        {
          id: 2,
          name: 'Robert Zemeckis',
          birth: 1952,
        },
      ],
      stars: [
        {
          id: 3,
          name: 'Michael J. Fox',
          birth: 1961,
        },
        {
          id: 4,
          name: 'Christopher Lloyd',
          birth: 1938,
        },
      ],
    })
  })
})

describe('POST /movies', () => {
  it('should create a movie with underlying relationships', async () => {
    const { body } = await supertest(app)
      .post('/movies')
      .send({
        title: 'The Matrix',
        year: 1999,
        directors: [
          {
            name: 'Lana Wachowski',
            birth: 1965,
          },
          {
            name: 'Lilly Wachowski',
            birth: 1967,
          },
        ],
        stars: [
          {
            name: 'Keanu Reeves',
            birth: 1964,
          },
          {
            name: 'Carrie-Anne Moss',
            birth: 1967,
          },
        ],
      })
      .expect(201)

    expect(body).toEqual({
      id: expect.any(Number),
      title: 'The Matrix',
      year: 1999,
      directors: [
        {
          id: expect.any(Number),
          name: 'Lana Wachowski',
          birth: 1965,
        },
        {
          id: expect.any(Number),
          name: 'Lilly Wachowski',
          birth: 1967,
        },
      ],
      stars: [
        {
          id: expect.any(Number),
          name: 'Keanu Reeves',
          birth: 1964,
        },
        {
          id: expect.any(Number),
          name: 'Carrie-Anne Moss',
          birth: 1967,
        },
      ],
    })
  })
})
