import supertest from 'supertest'
import { createTestDatabase } from '@tests/utils/createTestDatabase'
import { insertAll } from '@tests/utils/records'
import { Insertable } from 'kysely'
import { wrapInRollbacks } from '@tests/utils/transactions'
import createApp from '@/app'
import * as fixtures from './fixtures'
import { Comment } from '@/database'

const db = await wrapInRollbacks(createTestDatabase())
const app = createApp(db)

const articlesSeeded = await insertAll(db, 'article', fixtures.articles)
const usersSeeded = await insertAll(db, 'user', fixtures.users)

// producing fake data
const fakeComment = (
  overrides: Partial<Insertable<Comment>> = {}
): Insertable<Comment> => ({
  articleId: articlesSeeded[0].id,
  userId: usersSeeded[0].id,
  content: 'Some Content',
  ...overrides,
})

// Producing flexible matchers for our fake data.
// You are free to use simple hard-coded expectations for your tests.
// However, if you want to be have tests that pin-point the exact issue,
// you should consider matchers.
const commentMatcher = (overrides: Partial<Insertable<Comment>> = {}) => ({
  id: expect.any(Number),
  createdAt: expect.any(String),
  ...overrides, // for id, createdAt
  ...fakeComment(overrides),
})

describe('GET', () => {
  it('should return 400 if no articleId was specified', async () => {
    const { body } = await supertest(app).get('/comments').expect(400)

    expect(body.error.message).toMatch(/article/i)
  })

  it('should return 400 if articleId is not an integer', async () => {
    const { body } = await supertest(app)
      .get('/comments?articleId=abc')
      .expect(400)

    expect(body.error.message).toMatch(/integer|number|numeric/i)
  })

  it('should return a list of comments for a given article', async () => {
    const articleId1 = articlesSeeded[0].id
    const articleId2 = articlesSeeded[1].id

    await insertAll(db, 'comment', [
      fakeComment({
        articleId: articleId1,
      }),
      fakeComment({
        articleId: articleId2,
        content: 'Other Content',
      }),
    ])

    const { body } = await supertest(app)
      .get(`/comments?articleId=${articleId2}`)
      .expect(200)

    expect(body).toEqual([
      commentMatcher({
        articleId: articleId2,
        content: 'Other Content',
      }),
    ])
  })
})

describe('POST', () => {
  it('should allow creating a new comment', async () => {
    const { body } = await supertest(app)
      .post('/comments')
      .send(fakeComment())
      .expect(201)

    expect(body).toEqual(commentMatcher())
  })

  it('persists the new comment', async () => {
    const articleId1 = articlesSeeded[0].id

    // if we create a comment with a specific articleId
    await supertest(app)
      .post('/comments')
      .send(
        fakeComment({
          articleId: articleId1,
        })
      )
      .expect(201)

    // we should get back that comment when we request comments for that article
    const { body } = await supertest(app)
      .get(`/comments?articleId=${articleId1}`)
      .expect(200)

    expect(body).toEqual([
      commentMatcher({
        articleId: articleId1,
      }),
    ])
  })

  it('should return 400 if no articleId was specified', async () => {
    const { body } = await supertest(app).post('/comments').expect(400)

    expect(body.error.message).toMatch(/article/i)
  })

  it('should return 400 if no userId was specified', async () => {
    const { body } = await supertest(app).post('/comments').expect(400)

    expect(body.error.message).toMatch(/user/i)
  })

  it('should return 400 if no content was specified', async () => {
    const { body } = await supertest(app).post('/comments').expect(400)

    expect(body.error.message).toMatch(/content/i)
  })

  it('should return 400 if article does not exist', async () => {
    const { body } = await supertest(app)
      .post('/comments')
      .send(
        fakeComment({
          articleId: 123456,
        })
      )
      .expect(400)

    expect(body.error.message).toMatch(/article/i)
  })

  it('should return 400 if user does not exist', async () => {
    const { body } = await supertest(app)
      .post('/comments')
      .send(
        fakeComment({
          userId: 123456,
        })
      )
      .expect(400)

    expect(body.error.message).toMatch(/user/i)
  })
})

describe('PATCH', () => {
  it('does not support patching', async () => {
    await supertest(app).patch('/comments/123').expect(405)
  })
})

describe('DELETE', () => {
  it('does not support deleting', async () => {
    await supertest(app).delete('/comments/123').expect(405)
  })
})

describe('GET', () => {
  it('does not support getting individual comments', async () => {
    await supertest(app).get('/comments/123').expect(405)
  })
})
