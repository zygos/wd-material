import supertest from 'supertest';
import createApp from '@/app';
import createTestDatabase from '@tests/utils/createTestDatabase';
import { createFor } from '@tests/utils/records';

const db = await createTestDatabase();
const app = createApp(db);
const createArticles = createFor(db, 'article');

afterEach(async () => {
  await db.deleteFrom('article').execute();
});

describe('GET', () => {
  it('should return an empty array when there are no articles', async () => {
    const { body } = await supertest(app).get('/articles').expect(200);

    expect(body).toEqual([]);
  });

  it('should return a list of existing articles', async () => {
    await createArticles([
      {
        title: 'Title 1',
        content: 'Some Content',
        userId: null,
      },
      {
        title: 'Title 2',
        content: 'Other Content',
        userId: null,
      },
    ]);

    const { body } = await supertest(app).get('/articles').expect(200);

    expect(body).toEqual([
      {
        id: expect.any(Number),
        title: 'Title 1',
        content: 'Some Content',
        userId: null,
      },
      {
        id: expect.any(Number),
        title: 'Title 2',
        content: 'Other Content',
        userId: null,
      },
    ]);
  });
});

describe('GET /:id', () => {
  it('should return 404 if article does not exist', async () => {
    const { body } = await supertest(app).get('/articles/2912').expect(404);

    expect(body.error.message).toMatch(/not found/);
  });

  it('should return a single article if article exists', async () => {
    await createArticles([
      {
        id: 1371,
        title: 'Title',
        content: 'My Post Content',
      },
    ]);

    const { body } = await supertest(app).get('/articles/1371').expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      title: 'Title',
      content: 'My Post Content',
      userId: null,
    });
  });
});
