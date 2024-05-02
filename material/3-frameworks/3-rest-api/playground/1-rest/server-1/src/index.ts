import app from './app'

const PORT = 3000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at http://localhost:${PORT}`)
})
