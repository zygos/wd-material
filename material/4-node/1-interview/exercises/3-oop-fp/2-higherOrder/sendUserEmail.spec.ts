import { describe, expect, it } from 'vitest'
import {
  type User,
  sendPasswordChangedEmail,
  sendResetPasswordEmail,
  sendSignupEmail,
} from './sendUserEmail'

const user: User = {
  id: 1,
  name: 'Alan',
  email: 'alan@turingcollege.com',
}

describe('sendSignupEmail', () => {
  it('should send signup email', () => {
    const result = sendSignupEmail(user)

    expect(result).toEqual({
      message: 'Welcome, Alan! We are glad to have you on board.',
      to: user.email,
      status: 'success',
    })
  })
})

describe('sendResetPasswordEmail', () => {
  it('should send reset password email', () => {
    const result = sendResetPasswordEmail(user)

    expect(result).toEqual({
      message: 'Hi, Alan! You can reset your password here.',
      to: user.email,
      status: 'success',
    })
  })
})

describe('sendPasswordChangedEmail', () => {
  it('should send password changed email', () => {
    const result = sendPasswordChangedEmail(user)

    expect(result).toEqual({
      message: 'Hello, Alan! Your password has been changed.',
      to: user.email,
      status: 'success',
    })
  })
})
