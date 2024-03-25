import type { Comment } from '../types'

/**
 * Given a user id and a list of comments, return the comments that
 * have the given user id.
 */
export function getUserComments(userId: number, comments: Comment[]) {
  return comments.filter((comment) => comment.userId === userId)
}
