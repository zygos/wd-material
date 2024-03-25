import type { Post } from './types'

/**
 * Given a list of posts, returns the post that has the most comments.
 * If multiple posts have the same number of comments, the first one
 * in the list is returned. If the list is empty, undefined is returned.
 */
export function getMostCommented(posts: Post[]): Post | undefined {
  // TODO: Refactor this to use Array higher order functions.
  if (posts.length === 0) {
    return undefined
  }

  let mostCommented: Post = posts[0]
  let maxComments = posts[0].comments.length

  for (let i = 1; i < posts.length; i++) {
    if (posts[i].comments.length > maxComments) {
      maxComments = posts[i].comments.length
      mostCommented = posts[i]
    }
  }

  return mostCommented
}
