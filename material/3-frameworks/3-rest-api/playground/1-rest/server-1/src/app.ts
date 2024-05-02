import express from 'express'
import articles from './modules/articles/controller'

const app = express()

app.use(express.json())

app.use('/articles', articles)

export default app
