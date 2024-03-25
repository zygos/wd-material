import { sanitizeStrings, sendEmail } from '../somePackage'

export type User = {
  id: number
  name: string
  email: string
}

type FormUserMessage = (user: User) => string

// Now, we are accepting a function that forms the message instead
// of a prepared message. This way, our sendUserEmail still has the
// control over what happens over how user data is pre-processed.
// Accepting higher-order functions like this is a common pattern in FP.
// This is quite similar to the "strategy pattern" in OOP where
// a class accepts a strategy object that performs a specific task
// instead of performing the task itself.
function sendUserEmail(formMessage: FormUserMessage, user: User) {
  const userSanitized = sanitizeStrings(user)
  const message = formMessage(userSanitized)
  const email = {
    to: user.email,
    message,
  }

  return sendEmail(email)
}

export function sendSignupEmail(user: User) {
  return sendUserEmail(
    (user) => `Welcome, ${user.name}! We are glad to have you on board.`,
    user,
  )
}

export function sendResetPasswordEmail(user: User) {
  return sendUserEmail(
    (user) => `Hi, ${user.name}! You can reset your password here.`,
    user,
  )
}

export function sendPasswordChangedEmail(user: User) {
  return sendUserEmail(
    (user) => `Hello, ${user.name}! Your password has been changed.`,
    user,
  )
}
