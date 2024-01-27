import config from '@shared/config'
import createDatabase from '@shared/database'
import * as entities from './entities'

const database = createDatabase({
  ...config.database,
  entities,
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
