import config from '@server/config'
import createApp from './app'
import createDatabase from './database'

// force UTC timezone for timezone and database consistency
process.env.TZ = 'UTC'

const database = createDatabase(config.database)

database.initialize().then(() => {
  const app = createApp(database)
  const { port } = config

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running at http://localhost:${port}`)
  })
})
