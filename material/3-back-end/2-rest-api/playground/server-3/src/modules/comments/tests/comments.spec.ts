import supertest from 'supertest';
import createTestDatabase from '@tests/utils/createTestDatabase';
import { createFor } from '@tests/utils/records';
import { Insertable } from 'kysely';
import createApp from '@/app';
import * as fixtures from './fixtures';
import { Comment } from '@/database';

const db = await createTestDatabase();
const app = createApp(db);
const createArticles = createFor(db, 'article');
const createComments = createFor(db, 'comment');
const createUsers = createFor(db, 'user');

await createArticles(fixtures.articles);
await createUsers(fixtures.users);

afterEach(async () => {
  await db.deleteFrom('comment').execute();
});

// producing fake data
const commentFactory = (
  overrides: Partial<Insertable<Comment>> = {}
): Insertable<Comment> => ({
  articleId: 1,
  userId: 1,
  content: 'Some Content',
  ...overrides,
});

// Producing flexible matchers for our fake data.
// You are free to use simple hard-coded expectations for your tests.
// However, if you want to be have tests that pin-point the exact issue,
// you should consider matchers.
const commentMatcher = (overrides: Partial<Insertable<Comment>> = {}) => ({
  id: expect.any(Number),
  createdAt: expect.any(String),
  ...overrides, // for id, createdAt
  ...commentFactory(overrides),
});

describe('GET', () => {
  it('should return 400 if no articleId was specified', async () => {
    const { body } = await supertest(app).get('/comments').expect(400);

    expect(body.error.message).toMatch(/article/i);
  });

  it('should return 400 if articleId is not an integer', async () => {
    const { body } = await supertest(app)
      .get('/comments?articleId=abc')
      .expect(400);

    expect(body.error.message).toMatch(/integer|number|numeric/i);
  });

  it('should return a list of comments for a given article', async () => {
    await createComments([
      commentFactory(),
      commentFactory({
        articleId: 2,
        content: 'Other Content',
      }),
    ]);

    const { body } = await supertest(app)
      .get('/comments?articleId=2')
      .expect(200);

    expect(body).toEqual([
      commentMatcher({
        articleId: 2,
        content: 'Other Content',
      }),
    ]);
  });
});

describe('POST', () => {
  it('should allow creating a new comment', async () => {
    const { body } = await supertest(app)
      .post('/comments')
      .send(commentFactory())
      .expect(201);

    expect(body).toEqual(commentMatcher());
  });

  it('persists the new comment', async () => {
    await supertest(app).post('/comments').send(commentFactory()).expect(201);

    const { body } = await supertest(app)
      .get('/comments?articleId=1')
      .expect(200);

    expect(body).toEqual([commentMatcher()]);
  });

  it('should return 400 if no articleId was specified', async () => {
    const { body } = await supertest(app).post('/comments').expect(400);

    expect(body.error.message).toMatch(/article/i);
  });

  it('should return 400 if no userId was specified', async () => {
    const { body } = await supertest(app).post('/comments').expect(400);

    expect(body.error.message).toMatch(/user/i);
  });

  it('should return 400 if no content was specified', async () => {
    const { body } = await supertest(app).post('/comments').expect(400);

    expect(body.error.message).toMatch(/content/i);
  });

  it('should return 400 if article does not exist', async () => {
    const { body } = await supertest(app)
      .post('/comments')
      .send(
        commentFactory({
          articleId: 123456,
        })
      )
      .expect(400);

    expect(body.error.message).toMatch(/article/i);
  });

  it('should return 400 if user does not exist', async () => {
    const { body } = await supertest(app)
      .post('/comments')
      .send(
        commentFactory({
          userId: 123456,
        })
      )
      .expect(400);

    expect(body.error.message).toMatch(/user/i);
  });
});

describe('PATCH', () => {
  it('does not support patching', async () => {
    await supertest(app).patch('/comments/123').expect(405);
  });
});

describe('DELETE', () => {
  it('does not support deleting', async () => {
    await supertest(app).delete('/comments/123').expect(405);
  });
});

describe('GET', () => {
  it('does not support getting individual comments', async () => {
    await supertest(app).get('/comments/123').expect(405);
  });
});
