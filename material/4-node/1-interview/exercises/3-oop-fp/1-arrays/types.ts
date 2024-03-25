export type Comment = {
  postId: number
  userId: number
  text: string
  createdAt: Date
}

export type Post = {
  id: number
  isPublic: boolean
  comments: Comment[]
}
