import { expect, it } from 'vitest'
import { getLatestUserComments } from './6-getLatestUserComments'
import type { Post } from './types'

const posts: Post[] = [
  {
    id: 1,
    isPublic: true,
    comments: [
      {
        postId: 1,
        userId: 1,
        text: 'Interesting read.',
        createdAt: new Date('2024-03-01'),
      },
      {
        postId: 1,
        userId: 2,
        text: 'I think this is wrong.',
        createdAt: new Date('2024-03-02'),
      },
      {
        postId: 1,
        userId: 1,
        text: 'I changed my mind.',
        createdAt: new Date('2024-03-03'),
      },
    ],
  },
  {
    id: 2,
    isPublic: false,
    comments: [
      {
        postId: 2,
        userId: 1,
        text: 'I like it.',
        createdAt: new Date('2024-01-02'),
      },
      {
        postId: 2,
        userId: 3,
        text: 'I do not like it.',
        createdAt: new Date('2024-01-03'),
      },
    ],
  },
  {
    id: 3,
    isPublic: true,
    comments: [],
  },
]

it('should return user comments', () => {
  const userComments = getLatestUserComments(1, posts)

  expect(userComments).toContainEqual({
    postId: 1,
    userId: 1,
    text: 'Interesting read.',
    createdAt: expect.any(Date),
  })

  expect(userComments).toContainEqual({
    postId: 1,
    userId: 1,
    text: 'I changed my mind.',
    createdAt: expect.any(Date),
  })

  expect(userComments).toContainEqual({
    postId: 2,
    userId: 1,
    text: 'I like it.',
    createdAt: expect.any(Date),
  })
})

it('should not return any other comments', () => {
  const userComments = getLatestUserComments(1, posts)

  expect(userComments).toHaveLength(3)
})

it('should return different comments for different users', () => {
  const userComments = getLatestUserComments(2, posts)

  expect(userComments).not.toContainEqual({
    postId: 1,
    userId: 2,
    text: 'I think this is wrong.',
    date: expect.any(Date),
  })
  expect(userComments).not.toContainEqual({
    postId: 2,
    userId: 3,
    text: 'I do not like it.',
    date: expect.any(Date),
  })
})

it('should return comments sorted latest first', () => {
  const userComments = getLatestUserComments(1, posts)

  expect(userComments[0].createdAt.toISOString()).toBe(
    new Date('2024-03-03').toISOString(),
  )

  expect(userComments[1].createdAt.toISOString()).toBe(
    new Date('2024-03-01').toISOString(),
  )

  expect(userComments[2].createdAt.toISOString()).toBe(
    new Date('2024-01-02').toISOString(),
  )
})
