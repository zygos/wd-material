1. Create a new PostgreSQL database.
2. Create an `.env` file based on `.env.example` in the root folder of this project (side-by-side with `.env.example`).
3. Fill in the necessary credentials for the PostgreSQL database.
4. Wrap all entities (including `index.ts`) into an `entities` folder in-place.
5. Create a new `createDatabase.ts` file and pass in the appropriate config and entities to it.
6. Run `npx tsx typeorm-10/connectDatabase.ts` (or equivalent depending on path)
   to make sure your database is connected and that the table schema is synchronized.

```ts
// connectDatabase.ts:
import config from '@shared/config'
import createDatabase from '@shared/database'
import * as entities from './entities'

const database = createDatabase({
  // ...pass in the appropriate config
  // and entities
})

// using then/catch, so this is compatible with CommonJS
database
  .initialize()
  .then(() => {
    console.log('Database initialized')
  })
  .catch((error) => {
    console.error('Database failed to initialize')
    console.error(error)
  })
```
