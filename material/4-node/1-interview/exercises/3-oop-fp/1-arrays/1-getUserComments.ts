import type { Comment } from './types'

/**
 * Given a user id and a list of comments, return the comments that
 * have the given user id.
 */
export function getUserComments(
  userId: number,
  comments: Comment[],
): Comment[] {
  // TODO: Refactor this to use one of the built-in Array higher order functions.
  const userComments: Comment[] = []

  for (let i = 0; i < comments.length; i++) {
    if (comments[i].userId === userId) {
      userComments.push(comments[i])
    }
  }

  return userComments
}
