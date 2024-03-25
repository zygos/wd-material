import type { User, Article, Book } from '../entities';

/**
 * Returns a function that fetches data by ID.
 * @param baseUrl URL to the API endpoint without the trailing slash.
 * @returns A function that fetches data by ID from the specified API endpoint.
 */
function fetchById<T>(baseUrl: string) {
  return async function (id: number): Promise<???> {
    // TODO: Fetch the data by ID from the specified API endpoint.
  };
}

// We could move out the API origin (https://api.example.com) to a constant,
// though we will keep it simple for this example.
export const fetchUserById = fetchById<User>('https://api.example.com/users');
export const fetchArticleById = fetchById<Article>(
  'https://api.example.com/articles',
);
export const fetchBookById = fetchById<Book>('https://api.example.com/books');
