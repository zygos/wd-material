Create a new entity called `Person` (table "people") with the following properties:

- id: number (primary column)
- name: string
- birth: number (nullable)
- starred: Movie[] (many-to-many relationship)

The many-to-many relationship should be handled through a join table called `stars`.

We should be able to insert new people together with their starred movies in a single operation.

Do not to forget to add your new entity to index.ts!
