const main = async () => {
  try {
    await getBooks(10)
  } catch (error) {
    notifyErrorService(error)
    displayError(error)
  }
}

const wrapError = (errorMessage, fn) => async function wrappedInError(...fnArguments) {
  try {
    return await fn(...fnArguments)
  } catch (error) {
    throw new Error(errorMessage, { cause: error })
  }
}

const request = async () => {
  throw new Error('Not user-friendly error 🤢!')
}

const requestForBooks = wrapError('User friendly error.', request)

const getBooks = async (limit) => {
  const books = await requestForBooks()

  return books.slice(0, limit)
}

const notifyErrorService = (error) => {
  try {
    console.log(error.cause)
  } catch (error) {}
}

const displayError = (error) => {
  console.log(error)
}

main()
