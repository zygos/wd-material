import type { ColumnType } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Article {
  id: Generated<number>;
  title: string;
  content: string;
}

export interface Comment {
  id: Generated<number>;
  userId: number;
  articleId: number;
  content: string;
  createdAt: Generated<string>;
}

export interface User {
  id: Generated<number>;
  firstName: string;
  lastName: string;
}

export interface DB {
  article: Article;
  comment: Comment;
  user: User;
}
