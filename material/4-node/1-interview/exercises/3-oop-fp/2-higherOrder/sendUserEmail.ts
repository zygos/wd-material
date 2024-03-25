import { sanitizeStrings, sendEmail } from './somePackage'

export type User = {
  id: number
  name: string
  email: string
}

export function sendSignupEmail(user: User) {
  const userSanitized = sanitizeStrings(user)
  const message = `Welcome, ${userSanitized.name}! We are glad to have you on board.`

  const email = {
    to: user.email,
    message,
  }

  return sendEmail(email)
}

export function sendResetPasswordEmail(user: User) {
  const userSanitized = sanitizeStrings(user)
  const message = `Hi, ${userSanitized.name}! You can reset your password here.`

  const email = {
    to: user.email,
    message,
  }

  return sendEmail(email)
}

export function sendPasswordChangedEmail(user: User) {
  const userSanitized = sanitizeStrings(user)
  const message = `Hello, ${userSanitized.name}! Your password has been changed.`

  const email = {
    to: user.email,
    message,
  }

  return sendEmail(email)
}
