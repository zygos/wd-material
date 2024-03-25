import { type Email, sanitizeStrings, sendEmail } from '../somePackage'
import type { User } from '../types'

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

export const sendSignupEmail = sendUserEmail.bind(
  null,
  (user) => `Welcome, ${user.name}! We are glad to have you on board.`,
)

export const sendResetPasswordEmail = sendUserEmail.bind(
  null,
  (user) => `Hi, ${user.name}! You can reset your password here.`,
)

export const sendPasswordChangedEmail = sendUserEmail.bind(
  null,
  (user) => `Hello, ${user.name}! Your password has been changed.`,
)
