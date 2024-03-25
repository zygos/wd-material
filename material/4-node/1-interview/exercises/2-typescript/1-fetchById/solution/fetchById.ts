import type { User, Article, Book } from '../entities';

/**
 * Returns a function that fetches data by ID.
 * @param baseUrl URL to the API endpoint without the trailing slash.
 * @returns A function that fetches data by ID from the specified API endpoint.
 */
function fetchById<T>(baseUrl: string) {
  return async function (id: number): Promise<T> {
    const response = await fetch(`${baseUrl}/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return response.json() as Promise<T>;
  };
}

export const fetchUserById = fetchById<User>('https://api.example.com/users');
export const fetchArticleById = fetchById<Article>(
  'https://api.example.com/articles',
);
export const fetchBookById = fetchById<Book>('https://api.example.com/books');
