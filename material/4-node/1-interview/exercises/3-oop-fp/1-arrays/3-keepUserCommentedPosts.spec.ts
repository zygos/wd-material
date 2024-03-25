import { expect, it } from 'vitest'
import { keepUserCommentedPosts } from './3-keepUserCommentedPosts'
import type { Post } from './types'

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
    comments: [
      {
        postId: 2,
        userId: 1,
        text: 'Sounds good.',
        createdAt: new Date('2024-01-02'),
      },
    ],
  },
]

it('should return user comments', () => {
  const commentedPosts = keepUserCommentedPosts(1, posts)

  expect(commentedPosts).toEqual([
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
      comments: [
        {
          postId: 2,
          userId: 1,
          text: 'Sounds good.',
          createdAt: new Date('2024-01-02'),
        },
      ],
    },
  ])
})
