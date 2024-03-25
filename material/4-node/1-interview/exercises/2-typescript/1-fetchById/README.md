## Generic fetch

You are working with an external API that returns a different data type based on the endpoint. You have the following functions to fetch data from the API:

- `fetchUserById(id: number): Promise<User>`
- `fetchArticleById(id: number): Promise<Article>`
- `fetchBookById(id: number): Promise<Book>`

These functions are found in `nonGeneric.ts`.

You have been tasked to add 100s of similar fetch functions for different endpoints, all following the same logic of fetching records by numeric id. You have high confidence that:

1. These functions will not require any exceptional logic in the future
2. There is a high chance that you will need to make identical changes to all of them at some point (adding headers, authentication, error handling, etc). Right now, you would need to update all of these functions individually.

Could you make the current fetch logic more generic while preserving the type safety?

## Task

Open `fetchById.ts` and `fetchById.spec.ts`.

Implement a generic `fetchById` function factory that accepts a URL and a TypeScript type and returns a function that fetches data from the API and returns the data of the given type. The returned function should have the same type signature as the original fetch functions in `nonGeneric.ts`.

Make sure that the provided tests and TypeTest pass.

For simplicity, we will deal only with fetchUserById test cases.
