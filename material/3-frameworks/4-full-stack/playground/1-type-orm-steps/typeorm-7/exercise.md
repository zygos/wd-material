Add a new many-to-many relationship between Movies and Person on both sides:

- movies.directors: Person[]
- people.directed: Movie[]

Both relationships should come with insert and update cascades.

Relationship table should be called `directors`.
