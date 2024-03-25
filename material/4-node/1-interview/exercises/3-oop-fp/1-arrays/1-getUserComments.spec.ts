import { expect, it } from 'vitest'
import { getUserComments } from './1-getUserComments'
import type { Comment } from './types'

const comments: Comment[] = [
  { postId: 3, userId: 1, createdAt: new Date(), text: 'I like it' },
  { postId: 3, userId: 2, createdAt: new Date(), text: 'I like it too' },
  { postId: 6, userId: 1, createdAt: new Date(), text: 'I do not like it' },
]

it('should return user comments', () => {
  const userComments = getUserComments(1, comments)

  expect(userComments).toEqual([
    { postId: 3, userId: 1, text: 'I like it', createdAt: expect.any(Date) },
    {
      postId: 6,
      userId: 1,
      text: 'I do not like it',
      createdAt: expect.any(Date),
    },
  ])
})

it('should return different comments for different users', () => {
  const userComments = getUserComments(2, comments)

  expect(userComments).toEqual([
    {
      postId: 3,
      userId: 2,
      text: 'I like it too',
      createdAt: expect.any(Date),
    },
  ])
})
