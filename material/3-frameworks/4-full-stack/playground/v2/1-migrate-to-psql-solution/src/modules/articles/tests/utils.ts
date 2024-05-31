import { expect } from 'vitest'
import type { Insertable } from 'kysely'
import type { Article } from '@/database'

// Function to generate fake data.
// If our articles schema changes and our tests break,
// we will not have to update all our tests, but only this function.
export const fakeArticle = (
  overrides: Partial<Insertable<Article>> = {}
): Insertable<Article> => ({
  title: 'My Title',
  content: 'Some Content',
  ...overrides,
})

// Producing flexible matchers for our fake data.
// You are free to use simple hard-coded expectations for your tests.
// However, if you want to be have tests that pin-point the exact issue,
// you should consider matchers.
export const articleMatcher = (
  overrides: Partial<Insertable<Article>> = {}
) => ({
  id: expect.any(Number),
  ...overrides, // for id
  ...fakeArticle(overrides),
})

export const fakeArticleFull = (
  overrides: Partial<Insertable<Article>> = {}
) => ({
  id: 2,
  ...fakeArticle(overrides),
})
