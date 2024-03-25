import type { Post } from '../types'

/**
 * Given a user id and a list of posts, returns the posts that
 * have at least one comment from the given user.
 */
export function keepUserCommentedPosts(userId: number, posts: Post[]): Post[] {
  return posts.filter((post) =>
    post.comments.some((comment) => comment.userId === userId),
  )
}
