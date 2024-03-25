Continue working on the movie-rating relationship.

Configure the relationship, so we can:

- insert movie together with a rating
- update rating when we update movies
- delete ratings when we delete movies

Example:

```ts
movieRepository.save({
  title: 'Interstellar',
  year: 2014,
  rating: {
    // creates a new rating and associates it with the movie
    votes: 2_000_000,
    rating: 8.7,
  },
})
```

More details, as always, in the test file nearby.

Recommended resource:

- https://typeorm.io/relations#cascades

Hints:

- The solution will be very concise, just a few lines.
- You will need to update the rating.ts file too!
- You will need to apply both "cascade" and "onDelete" options, though not necessarily
  in the same place.
