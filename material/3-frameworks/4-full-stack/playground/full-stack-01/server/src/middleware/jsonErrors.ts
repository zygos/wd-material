import { type ErrorRequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ZodError } from 'zod'

const { NODE_ENV } = process.env
const isTest = NODE_ENV === 'test'

/**
 * Reports error in a simple structured JSON format.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jsonErrors: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = getErrorStatusCode(error)

  // display error in the console
  if (!isTest) {
    // tests tend to produce errors on purpose and
    // we don't want to pollute the console expected behavior
    // eslint-disable-next-line no-console
    console.error(error)
  }

  res.status(statusCode).json({
    error: {
      message: error.message ?? 'Internal server error',
      ...error,
    },
  })
}

function getErrorStatusCode(error: Error) {
  if ('status' in error && typeof error.status === 'number') {
    return error.status
  }

  // some implementation detail awareness
  if (error instanceof ZodError) return StatusCodes.BAD_REQUEST

  // assume the worst
  return StatusCodes.INTERNAL_SERVER_ERROR
}

export default jsonErrors
