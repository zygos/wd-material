import { expect, it } from 'vitest'
import { isAnyPrivate } from './2-isAnyPrivate'
import type { Post } from './types'

const fakePost = (isPublic: boolean): Post => ({
  id: 123,
  isPublic,
  comments: [],
})

const publicPost = fakePost(true)
const privatePost = fakePost(false)

it('should return false for an empty array', () => {
  const posts: Post[] = []

  expect(isAnyPrivate(posts)).toEqual(false)
})

it('should return false for public posts', () => {
  const posts: Post[] = [publicPost]

  expect(isAnyPrivate(posts)).toEqual(false)
})

it('should return true for private posts', () => {
  const posts: Post[] = [privatePost]

  expect(isAnyPrivate(posts)).toEqual(true)
})

it('should return true for mixed posts', () => {
  const posts: Post[] = [publicPost, privatePost, publicPost]

  expect(isAnyPrivate(posts)).toEqual(true)
})
