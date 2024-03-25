import type { Post } from './types'

/**
 * Returns true if any of the posts is not public.
 * Returns false if the array is empty.
 */
export function isAnyPrivate(posts: Post[]) {
  // TODO: Refactor this to use an Array higher order function.
  for (let i = 0; i < posts.length; i++) {
    if (!posts[i].isPublic) {
      return true
    }
  }

  return false
}
