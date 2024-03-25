import type { User, Article, Book } from './entities';

/**
 * Returns a function that fetches data by ID.
 * @param baseUrl URL to the API endpoint without the trailing slash.
 * @returns A function that fetches data by ID from the specified API endpoint.
 */
function fetchById<T>(baseUrl: string) {
  // TODO: Implement this function.
  // The key challenge is to make sure our function returns the correct type.
}

// Expected usage:
export const fetchUserById = fetchById<User>('https://api.example.com/users');
export const fetchArticleById = fetchById<Article>(
  'https://api.example.com/articles',
);
export const fetchBookById = fetchById<Book>('https://api.example.com/books');
