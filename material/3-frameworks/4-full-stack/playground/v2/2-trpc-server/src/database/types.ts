import type { ColumnType } from 'kysely'

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface Bug {
  code: string | null
  id: Generated<number>
  name: string
  projectId: number
  resolvedAt: Timestamp | null
  stacktrace: string | null
}

export interface Project {
  id: Generated<number>
  name: string
  userId: number
}

export interface User {
  email: string
  id: Generated<number>
  password: string
}

export interface DB {
  bug: Bug
  project: Project
  user: User
}
