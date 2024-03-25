import { expect, it } from 'vitest'
import { getMostCommented } from './5-getMostCommented'
import type { Post } from './types'

const mostCommentedExpected: Post = {
  id: 2,
  isPublic: true,
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
}

const posts: Post[] = [
  {
    id: 1,
    isPublic: true,
    comments: [
      {
        postId: 1,
        userId: 2,
        text: 'I think this is wrong.',
        createdAt: new Date('2024-03-02'),
      },
    ],
  },
  mostCommentedExpected,
  {
    id: 3,
    isPublic: true,
    comments: [],
  },
]

it('should return the undefined for empty array', () => {
  const mostCommented = getMostCommented([])

  expect(mostCommented).toEqual(undefined)
})

it('should return the most commented post', () => {
  const mostCommented = getMostCommented(posts)

  expect(mostCommented).toEqual(mostCommentedExpected)
})
