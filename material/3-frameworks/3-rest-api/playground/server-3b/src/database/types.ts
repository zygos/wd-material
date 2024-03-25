import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Article {
  id: Generated<number | null>;
  title: string;
  content: string;
  user_id: number | null;
}

export interface Category {
  id: Generated<number | null>;
  name: string;
}

export interface Comment {
  id: Generated<number | null>;
  user_id: number;
  content: string;
}

export interface User {
  id: Generated<number | null>;
  username: string;
}

export interface DB {
  article: Article;
  category: Category;
  comment: Comment;
  user: User;
}
