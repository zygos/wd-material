## Exercise: Implementing a Generic JSON Route Handler for Express

### Introduction

In this exercise, we will revisit and refine a utility function previously introduced in our Express.js material: the `jsonRoute` function. Initially, you were not expected to come up with this function independently. However, with your current understanding of TypeScript types and generics, it's the perfect time to challenge yourself to recreate it.

**Problem:** In a typical Express.js application, handling routes often involves repetitive boilerplate code for sending JSON responses and handling errors. This redundancy becomes more apparent as the application grows, leading to harder to maintain. By implementing a generic JSON route handler, we aim to reduce this boilerplate, making our route definitions more concise and easier to manage.

### Task

Consider an Express application in `app.ts`.

Your task is to implement a generic function that encapsulates the repetitive logic of sending JSON responses and error handling in async routes. This function should be flexible enough for any route handler that returns any async value. It is not necessary to consider streams or non-JSON responses.

1. Implement `jsonRoute.ts` to move all generic logic to the `jsonRoute` function.

There are a few `jsonRoute.spec.ts` tests to get you started. You might find it helpful to add more test cases to ensure that the function works as expected.

```ts
app.get('/movie/:id', async (req, res, next) => {
  try {
    // Unique logic for this route:
    // --------------------
    const movieId = parseInt(req.params.id, 10);

    if (typeof movieId !== 'number' || Number.isNaN(movieId)) {
      throw new Error('Invalid movie ID');
    }

    const movieDetails = await getMovieDetails(movieId);
    // -------------------

    // everything else, including the try/catch block, is structurally the same
    res.status(StatusCodes.OK).json(movieDetails);
  } catch (error) {
    next(error);
  }
});

// We would like to end up boilerplate-free code that contains only
// the unique logic:
app.get('/movie/:id', jsonRoute((req) => {
  const movieId = parseInt(req.params.id, 10);

  if (typeof movieId !== 'number' || Number.isNaN(movieId)) {
    throw new Error('Invalid movie ID');
  }

  return getMovieDetails(movieId);
});
// *this could be an async function, but it does not make a difference
// as getMovieDetails returns a Promise anyway, we do not need
// an await here.
```

**Important.** If you find it difficult to get started or understand what to do next, use the provided hints in the `hints` folder.

2. Run `npm test app` and update `app.ts` endpoints one by one to use the `jsonRoute` function for all route handlers.
3. Make sure that the provided tests pass.
4. Bonus. Can you use generics to ensure each route handler's response type matches the expected type?
