import type { Post } from './types'

/**
 * Given a user id and a list of posts, returns the posts that
 * have at least one comment from the given user.
 */
export function keepUserCommentedPosts(userId: number, posts: Post[]): Post[] {
  // TODO: Refactor this to use Array higher order functions.
  const commentedPosts: Post[] = []

  for (let i = 0; i < posts.length; i++) {
    for (let j = 0; j < posts[i].comments.length; j++) {
      if (posts[i].comments[j].userId === userId) {
        commentedPosts.push(posts[i])
        break
      }
    }
  }

  return commentedPosts
}
