import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { getRecentComments } from './4-getRecentComments'
import type { Comment } from './types'

const comments: Comment[] = [
  {
    postId: 1,
    userId: 1,
    text: 'Interesting read.',
    createdAt: new Date('2024-01-01Z'),
  },
  {
    postId: 1,
    userId: 2,
    text: 'I think this is wrong.',
    createdAt: new Date('2024-01-22Z'),
  },
  {
    postId: 1,
    userId: 1,
    text: 'I changed my mind.',
    createdAt: new Date('2024-02-14Z'),
  },
  {
    postId: 2,
    userId: 1,
    text: 'I like it.',
    createdAt: new Date('2024-02-20Z'),
  },
]

beforeEach(() => {
  vi.useFakeTimers()

  const date = new Date('2024-02-20Z')
  vi.setSystemTime(date)
})

afterEach(() => {
  vi.useRealTimers()
})

describe('getRecentComments', () => {
  it('should return last day comments', () => {
    const result = getRecentComments(comments)

    expect(result.lastDayComments).toEqual([
      {
        postId: 2,
        userId: 1,
        text: 'I like it.',
        createdAt: new Date('2024-02-20Z'),
      },
    ])
  })

  it('should return last week comments', () => {
    const result = getRecentComments(comments)

    expect(result.lastWeekComments).toEqual([
      {
        postId: 1,
        userId: 1,
        text: 'I changed my mind.',
        createdAt: new Date('2024-02-14Z'),
      },
      {
        postId: 2,
        userId: 1,
        text: 'I like it.',
        createdAt: new Date('2024-02-20Z'),
      },
    ])
  })

  it('should return last month comments', () => {
    const result = getRecentComments(comments)

    expect(result.lastMonthComments).toEqual([
      {
        postId: 1,
        userId: 2,
        text: 'I think this is wrong.',
        createdAt: new Date('2024-01-22Z'),
      },
      {
        postId: 1,
        userId: 1,
        text: 'I changed my mind.',
        createdAt: new Date('2024-02-14Z'),
      },
      {
        postId: 2,
        userId: 1,
        text: 'I like it.',
        createdAt: new Date('2024-02-20Z'),
      },
    ])
  })
})
