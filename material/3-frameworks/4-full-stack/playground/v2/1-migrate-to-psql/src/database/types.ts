import type { ColumnType } from 'kysely'

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>

export interface Article {
  content: string
  id: Generated<number>
  title: string
}

export interface Comment {
  articleId: number
  content: string
  createdAt: Generated<string>
  id: Generated<number>
  userId: number
}

export interface User {
  firstName: string
  id: Generated<number>
  lastName: string
}

export interface DB {
  article: Article
  comment: Comment
  user: User
}
