import supertest from 'supertest'
import { createTestDatabase } from '@tests/utils/database'
import { clearTables, insertAll } from '@tests/utils/records'
import { omit } from 'lodash/fp'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { fakeArticle, articleMatcher } from './utils'
import createApp from '@/app'

// our test database is completely empty and it is only used by
// this test module, so we are free to do whatever we want with it
const db = await wrapInRollbacks(createTestDatabase())
const app = createApp(db)

await clearTables(db, ['article'])

// This is not called "contoller.spec.ts" because we are specifying what this
// entire module should do, not just the controller.

// This could be moved to root-level tests folder, however, nearly always
// breaking tests here means issues in the articles module, so we are colocating
// it with the module.
describe('GET', () => {
  it('should return an empty array when there are no articles', async () => {
    // ACT (When we request...)
    const { body } = await supertest(app).get('/articles').expect(200)

    // ASSERT (Then we should get...)
    expect(body).toEqual([])
  })
})

describe('GET /:id', () => {
  it('should return 404 if article does not exist', async () => {
    // ACT (When we request...)
    const { body } = await supertest(app).get('/articles/2912').expect(404)

    // ASSERT (Then we should get...)
    // Some error message that contains "not found".
    // Instead of stating the exact error message, we use a
    // regular expression to draw slightly more flexible boundaries
    // around our expectations. If we wanted to slightly change
    // our error message in code, we would not want these tests to break,
    // as long as the error message still contains "not found" in some
    // form: "Article Not Found", "Not found", "Article was not found"...
    expect(body.error.message).toMatch(/not found/i)
  })

  it('should return an article if it exists', async () => {
    // ARRANGE (Given that we have...)
    const [{ id }] = await insertAll(db, 'article', [fakeArticle()])

    // ACT (When we request...)
    const { body } = await supertest(app).get(`/articles/${id}`).expect(200)

    // ASSERT (Then we should get...)
    expect(body).toEqual(articleMatcher({ id }))
  })
})

describe('POST', () => {
  it('should return 400 if title is missing', async () => {
    // ACT (When we request...)
    const { body } = await supertest(app)
      .post('/articles')
      .send(omit(['title'], fakeArticle({})))
      .expect(400) // a cheeky convenient expectation inside of ACT

    // ASSERT (Then we should get...)
    expect(body.error.message).toMatch(/title/i)
  })

  it('should return 400 if content is missing', async () => {
    // ACT (When we request...)
    const { body } = await supertest(app)
      .post('/articles')
      .send(omit(['content'], fakeArticle({})))
      .expect(400)

    // ASSERT (Then we should get...)
    expect(body.error.message).toMatch(/content/i)
  })

  it('does not allow to create an article with an empty title', async () => {
    // ACT (When we request...)
    const { body } = await supertest(app)
      .post('/articles')
      .send(fakeArticle({ title: '' }))
      .expect(400)

    // ASSERT (Then we should get...)
    expect(body.error.message).toMatch(/title/i)
  })

  it('does not allow to create an article with empty content', async () => {
    const { body } = await supertest(app)
      .post('/articles')
      .send(fakeArticle({ content: '' }))
      .expect(400)

    expect(body.error.message).toMatch(/content/i)
  })

  it('should return 201 and created article record', async () => {
    const { body } = await supertest(app)
      .post('/articles')
      .send(fakeArticle())
      .expect(201)

    expect(body).toEqual(articleMatcher())
  })
})

describe('PATCH /:id', () => {
  it('returns 404 if article does not exist', async () => {
    const { body } = await supertest(app)
      .patch('/articles/123456')
      .send(fakeArticle())
      .expect(404)

    expect(body.error.message).toMatch(/not found/i)
  })

  it('allows partial updates', async () => {
    const [{ id }] = await insertAll(db, 'article', [fakeArticle()])

    const { body } = await supertest(app)
      .patch(`/articles/${id}`)
      .send({ content: 'Updated!' })
      .expect(200)

    expect(body).toEqual(
      articleMatcher({
        id,
        content: 'Updated!',
      })
    )
  })

  it('persists changes', async () => {
    const [{ id }] = await insertAll(db, 'article', [fakeArticle()])

    await supertest(app)
      .patch(`/articles/${id}`)
      .send({ title: 'Persisted!', content: 'This too!' })
      .expect(200)

    const { body } = await supertest(app).get(`/articles/${id}`).expect(200)

    expect(body).toEqual(
      articleMatcher({
        id,
        title: 'Persisted!',
        content: 'This too!',
      })
    )
  })
})

describe('DELETE', () => {
  it('does not support deleting', async () => {
    await supertest(app).delete('/comments/123').expect(405)
  })
})
