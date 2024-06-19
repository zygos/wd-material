import { createTestDatabase } from '@tests/utils/database'
import {
  fakeArticle,
  fakeComment,
  fakeUser,
} from '@server/entities/tests/fakes'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { insertAll } from '@tests/utils/records'
import { userKeysPublic } from '@server/entities/user'
import { commentRepository } from '../commentRepository'
import { pick } from 'lodash-es'

const db = await wrapInRollbacks(createTestDatabase())
const repository = commentRepository(db)

// An example of repository tests with a database.
const [userOne, userTwo] = await insertAll(db, 'user', [fakeUser(), fakeUser()])
const [articleOne, articleTwo] = await insertAll(db, 'article', [
  fakeArticle({
    userId: userOne.id,
  }),
  fakeArticle({
    userId: userOne.id,
  }),
])

describe('findByArticleId', () => {
  it('should find non-spam comments with authors by article id', async () => {
    // Given
    const comments = await insertAll(db, 'comment', [
      // a few combinations of article and user ids
      fakeComment({
        articleId: articleOne.id,
        userId: userOne.id,
      }),
      fakeComment({
        articleId: articleTwo.id,
        userId: userOne.id,
      }),
      fakeComment({
        articleId: articleOne.id,
        userId: userTwo.id,
      }),
    ])

    // When
    const commentsFound = await repository.findByArticleId(articleOne.id)

    // Then
    expect(commentsFound).toEqual([
      {
        ...comments[2],
        author: pick(userOne, userKeysPublic),
      },
    ])
  })

  it('should return an empty array if no comments are found', async () => {
    // Given
    const articleId = 456

    // When
    const commentsFound = await repository.findByArticleId(articleId)

    // Then
    expect(commentsFound).toEqual([])
  })
})
