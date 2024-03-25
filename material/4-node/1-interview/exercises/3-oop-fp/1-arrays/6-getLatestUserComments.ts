import type { Comment, Post } from './types'

/**
 * Get user comments from a list of posts sorted by createdAt date in descending order.
 * @param userId user id to filter comments
 * @param posts list of posts to filter comments from
 */
export function getLatestUserComments(userId: number, posts: Post[]) {
  // TODO: Refactor this to use Array higher order functions.
  const userComments: Comment[] = []

  // collect use comments from all posts
  for (let i = 0; i < posts.length; i++) {
    for (let j = 0; j < posts[i].comments.length; j++) {
      if (posts[i].comments[j].userId === userId) {
        userComments.push(posts[i].comments[j])
      }
    }
  }

  // inline bubble sort
  for (let i = 0; i < userComments.length; i++) {
    for (let j = i + 1; j < userComments.length; j++) {
      if (userComments[i].createdAt < userComments[j].createdAt) {
        const temp = userComments[i]
        userComments[i] = userComments[j]
        userComments[j] = temp
      }
    }
  }

  return userComments
}
