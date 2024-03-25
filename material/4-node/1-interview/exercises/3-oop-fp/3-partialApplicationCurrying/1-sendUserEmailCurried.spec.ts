import { describe, expect, it } from 'vitest'
import type { User } from './types'
import {
  sendPasswordChangedEmail,
  sendResetPasswordEmail,
  sendSignupEmail,
} from './1-sendUserEmailCurried'

const email = 'alan@turingcollege.com'

const user: User = {
  id: 1,
  name: 'Alan',
  email,
}

describe('sendSignupEmail', () => {
  it('should send signup email', () => {
    const result = sendSignupEmail(user)

    expect(result).toEqual({
      message: 'Welcome, Alan! We are glad to have you on board.',
      to: email,
      status: 'success',
    })
  })
})

describe('sendResetPasswordEmail', () => {
  it('should send reset password email', () => {
    const result = sendResetPasswordEmail(user)

    expect(result).toEqual({
      message: 'Hi, Alan! You can reset your password here.',
      to: email,
      status: 'success',
    })
  })
})

describe('sendPasswordChangedEmail', () => {
  it('should send password changed email', () => {
    const result = sendPasswordChangedEmail(user)

    expect(result).toEqual({
      message: 'Hello, Alan! Your password has been changed.',
      to: email,
      status: 'success',
    })
  })
})
