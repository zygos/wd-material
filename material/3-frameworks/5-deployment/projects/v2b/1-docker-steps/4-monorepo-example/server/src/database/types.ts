import type { ColumnType } from 'kysely'

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface Article {
  content: string
  id: Generated<number>
  title: string
  userId: number
}

export interface Comment {
  articleId: number
  content: string
  createdAt: Generated<Timestamp>
  id: Generated<number>
  isSpam: Generated<boolean>
  userId: number
}

export interface User {
  email: string
  firstName: string
  id: Generated<number>
  lastName: string
  password: string
}

export interface DB {
  article: Article
  comment: Comment
  user: User
}
