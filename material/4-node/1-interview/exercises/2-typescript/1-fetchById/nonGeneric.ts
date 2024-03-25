import type { User, Article, Book } from './entities';

export async function fetchUserById(id: number): Promise<User> {
  const response = await fetch(`https://api.example.com/users/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json() as Promise<User>;
}

export async function fetchArticleById(id: number): Promise<Article> {
  const response = await fetch(`https://api.example.com/articles/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json() as Promise<Article>;
}

export async function fetchBookById(id: number): Promise<Book> {
  const response = await fetch(`https://api.example.com/books/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json() as Promise<Book>;
}
