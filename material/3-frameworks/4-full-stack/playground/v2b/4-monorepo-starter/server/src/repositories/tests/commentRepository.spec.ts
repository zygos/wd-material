import { createTestDatabase } from '@tests/utils/database'
import {
  fakeArticle,
  fakeComment,
  fakeUser,
} from '@server/entities/tests/fakes'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { insertAll } from '@tests/utils/records'
import { commentRepository } from '../commentRepository'

const db = await wrapInRollbacks(createTestDatabase())
const repository = commentRepository(db)

// An example of database setup before a repository test.
const [userOne, userTwo] = await insertAll(db, 'user', [fakeUser(), fakeUser()])
const [articleOne, articleTwo] = await insertAll(db, 'article', [
  fakeArticle({
    userId: userOne.id,
  }),
  fakeArticle({
    userId: userOne.id,
  }),
])

describe('some method', () => {
  it('passes', () => {})
})
