import type { Post } from '../types'

/**
 * Given a list of posts, returns the post that has the most comments.
 * If multiple posts have the same number of comments, the first one
 * in the list is returned. If the list is empty, undefined is returned.
 */
export function getMostCommented(posts: Post[]): Post | undefined {
  if (posts.length === 0) {
    return undefined
  }

  return posts.reduce(getMoreCommented, posts[0])
}

const getMoreCommented = (postA: Post, postB: Post) =>
  postA.comments.length > postB.comments.length ? postA : postB

// It is important to note that the reduce function is not intuive
// for many junior-mid level developers, so it should be used sparingly.
// Avoid using long reduce functions that are beyond ~4 lines.
