import { createTestDatabase } from '@tests/utils/database'
import {
  fakeArticle,
  fakeComment,
  fakeUser,
} from '@server/entities/tests/fakes'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { insertAll, selectAll } from '@tests/utils/records'
import { pick } from 'lodash-es'
import { userKeysPublic } from '@server/entities/user'
import { commentKeysPublic } from '@server/entities/comment'
import { commentRepository } from '../commentRepository'

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

const fakeCommentDefault = (comment: Parameters<typeof fakeComment>[0] = {}) =>
  fakeComment({
    articleId: articleOne.id,
    userId: userOne.id,
    ...comment,
  })

describe('create', () => {
  it('should create a new comment', async () => {
    // Given
    const comment = fakeCommentDefault()

    // When
    const createdComment = await repository.create(comment)

    // Then
    expect(createdComment).toEqual({
      id: expect.any(Number),
      ...pick(comment, commentKeysPublic),
      author: pick(userOne, userKeysPublic),
    })
  })
})

describe('markAsSpam', async () => {
  it('should mark a comment as spam', async () => {
    const [comment] = await insertAll(db, 'comment', [
      fakeComment({
        articleId: articleOne.id,
        userId: userOne.id,
      }),
    ])

    // When
    const updatedComment = await repository.markAsSpam(comment.id)

    // Then
    expect(updatedComment).toMatchObject({
      isSpam: true,
    })
  })

  it('should not mark other comments as spam', async () => {
    // Here is an example of testing not only what should happen, but also what should not happen.

    // Given
    const [commentOne, commentTwo] = await insertAll(db, 'comment', [
      fakeCommentDefault(),
      fakeCommentDefault(),
    ])

    // When
    await repository.markAsSpam(commentTwo.id)

    // Then
    const [commentOneAfterUpdate] = await selectAll(db, 'comment', (eb) =>
      eb('id', '=', commentOne.id)
    )
    expect(commentOneAfterUpdate).toEqual(commentOne)
  })

  it('should throw an error when trying to update a non-existing comment', async () => {
    // When
    await expect(repository.markAsSpam(999999)).rejects.toThrowError(
      /no result/i
    )
  })

  it('should allow marking a spam twice without an error', async () => {
    const [comment] = await insertAll(db, 'comment', [fakeCommentDefault()])

    // When
    await expect(repository.markAsSpam(comment.id)).resolves.not.toThrowError()
    const updatedComment = await repository.markAsSpam(comment.id)

    // Then
    expect(updatedComment).toMatchObject({
      isSpam: true,
    })
  })
})

describe('findByArticleId', () => {
  it('should find comments with authors by article id', async () => {
    // Given
    const comments = await insertAll(db, 'comment', [
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
        ...pick(comments[0], commentKeysPublic),
        author: pick(userOne, userKeysPublic),
      },
      {
        ...pick(comments[2], commentKeysPublic),
        author: pick(userTwo, userKeysPublic),
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

  it('should not return spam comments', async () => {
    // Given
    const [commentSpam] = await insertAll(db, 'comment', [fakeCommentDefault()])
    await repository.markAsSpam(commentSpam.id)

    // When
    const commentsFound = await repository.findByArticleId(articleOne.id)

    // Then
    expect(commentsFound).toEqual([])
  })
})
