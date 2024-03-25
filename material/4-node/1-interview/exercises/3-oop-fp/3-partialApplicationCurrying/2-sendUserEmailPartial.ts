import { type Email, sanitizeStrings, sendEmail } from './somePackage'
import type { User } from './types'

type FormUserMessage = (user: User) => string

const sendUserEmail = (formMessage: FormUserMessage, user: User): Email => {
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
