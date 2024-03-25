import type { Post } from '../types'

// There are a few ways to solve this problem, but we will use this solution
// as an opportunity to introduce/remind you of the flatMap method, which you
// might not have used before.

/**
 * Get user comments from a list of posts sorted by createdAt date in descending order.
 * @param userId user id to filter comments
 * @param posts list of posts to filter comments from
 */
export function getLatestUserComments(userId: number, posts: Post[]) {
  return posts
    .flatMap((post) => post.comments)
    .filter((comment) => comment.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}
