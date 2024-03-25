import { sanitizeStrings, sendEmail } from '../somePackage'

export type User = {
  id: number
  name: string
  email: string
}

// This is a great start. However, it leaves sendUserEmail caller
// with the responsibility of sanitizing the user.
// A developer might forget to do this, and it would be hard to catch.
// Let's make sanitization a necessary part of the process.
// Then, instead of passing a formed message to sendUserEmail, we could
// pass a function that forms the message given a sanitized user.
function sendUserEmail(message: string, user: User) {
  // TODO: add sanitization here
  // TODO: instead of accepting a message, accept a function that forms the message
  const email = {
    to: user.email,
    message,
  }

  return sendEmail(email)
}

// TODO: move out sanitization outside of these functions
export function sendSignupEmail(user: User) {
  const userSanitized = sanitizeStrings(user)
  const message = `Welcome, ${userSanitized.name}! We are glad to have you on board.`

  return sendUserEmail(message, user)
}

export function sendResetPasswordEmail(user: User) {
  const userSanitized = sanitizeStrings(user)
  const message = `Hi, ${userSanitized.name}! You can reset your password here.`

  return sendUserEmail(message, user)
}

export function sendPasswordChangedEmail(user: User) {
  const userSanitized = sanitizeStrings(user)
  const message = `Hello, ${userSanitized.name}! Your password has been changed.`

  return sendUserEmail(message, user)
}
