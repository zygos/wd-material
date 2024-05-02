import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor, selectAllFor } from '@tests/utils/records'
import buildRepository from '../repository'
import { fakeArticle, articleMatcher } from './utils'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createArticles = createFor(db, 'article')
const selectArticles = selectAllFor(db, 'article')

afterAll(() => db.destroy())

afterEach(async () => {
  // clearing the tested table after each test
  await db.deleteFrom('article').execute()
})

describe('create', () => {
  it('should create an article (explicitly listing all fields)', async () => {
    // ACT (When we call...)
    const article = await repository.create({
      title: 'My Title',
      content: 'Some Content',
    })

    // ASSERT (Then we should get...)
    // checking the returned article
    expect(article).toEqual({
      // any number is fine, we might want to check that it is an integer
      // but this is good enough to drive our development
      id: expect.any(Number),
      title: 'My Title',
      content: 'Some Content',
    })

    // checking directly in the database
    const articlesInDatabase = await selectArticles()
    expect(articlesInDatabase).toEqual([article])
  })

  it('should create an article (with fake data functions)', async () => {
    // same as the test above, but using fake data functions
    // ACT (When we call...)
    const article = await repository.create(fakeArticle())

    // ASSERT (Then we should get...)
    expect(article).toEqual(articleMatcher())

    // checking directly in the database
    const articlesInDatabase = await selectArticles()
    expect(articlesInDatabase).toEqual([article])
  })
})

describe('findAll', () => {
  it('should return all articles', async () => {
    // ARRANGE (Given that we have the following records in the database...)
    await createArticles([
      fakeArticle({
        title: 'Title 1',
      }),
      fakeArticle({
        title: 'Title 2',
      }),
    ])

    // ACT (When we call...)
    const articles = await repository.findAll()

    // ASSERT (Then we should get...)
    expect(articles).toHaveLength(2)
    expect(articles[0]).toEqual(articleMatcher({ title: 'Title 1' }))
    expect(articles[1]).toEqual(articleMatcher({ title: 'Title 2' }))
  })
})

describe('findById', () => {
  it('should return an article by id', async () => {
    // ARRANGE (Given that we have the following records in the database...)
    const [article] = await createArticles(
      fakeArticle({
        id: 1371,
      })
    )

    // ACT (When we call...)
    const foundArticle = await repository.findById(article!.id)

    // ASSERT (Then we should get...)
    expect(foundArticle).toEqual(articleMatcher())
  })

  it('should return undefined if article is not found', async () => {
    // ACT (When we call...)
    const foundArticle = await repository.findById(999999)

    // ASSERT (Then we should get...)
    expect(foundArticle).toBeUndefined()
  })
})

describe('update', () => {
  it('should update an article', async () => {
    // ARRANGE (Given that we have the following record in the database...)
    const [article] = await createArticles(fakeArticle())

    // ACT (When we call...)
    const updatedArticle = await repository.update(article.id, {
      title: 'Updated article',
    })

    // ASSERT (Then we should get...)
    expect(updatedArticle).toMatchObject(
      articleMatcher({
        title: 'Updated article',
      })
    )
  })

  it('should return the original article if no changes are made', async () => {
    // ARRANGE (Given that we have the following record in the database...)
    const [article] = await createArticles(fakeArticle())

    // ACT (When we call...)
    const updatedArticle = await repository.update(article.id, {})

    // ASSERT (Then we should get...)
    expect(updatedArticle).toMatchObject(articleMatcher())
  })

  it('should return undefined if article is not found', async () => {
    // ACT (When we call...)
    const updatedArticle = await repository.update(999, {
      title: 'Updated article',
    })

    // We could also opt for throwing an error here, but this is a design decision

    // ASSERT (Then we should get...)
    expect(updatedArticle).toBeUndefined()
  })
})

describe('remove', () => {
  it('should remove an article', async () => {
    // ARRANGE (Given that we have the following record in the database...)
    const [article] = await createArticles(fakeArticle())

    // ACT (When we call...)
    const removedArticle = await repository.remove(article.id)

    // ASSERT (Then we should get...)
    expect(removedArticle).toEqual(articleMatcher())
  })

  it('should return undefined if article is not found', async () => {
    // ACT (When we call...)
    const removedArticle = await repository.remove(999)

    // We could also opt for throwing an error here
    // but we decided to return undefined
    expect(removedArticle).toBeUndefined()
  })
})
