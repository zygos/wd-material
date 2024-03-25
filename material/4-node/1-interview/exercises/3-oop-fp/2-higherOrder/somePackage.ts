// Imagine this is 3rd party package that can not be changed.
export type Email = {
  to: string
  message: string
}

export function sendEmail(email: Email) {
  return {
    to: email.to,
    message: email.message,
    status: 'success',
  }
}

export function sanitizeStrings<T extends Record<string, unknown>>(user: T): T {
  return Object.fromEntries(
    Object.entries(user).map(([key, value]) => {
      if (typeof value === 'string') {
        return [key, sanitizeString(value)]
      }

      return [key, value]
    }),
  ) as T
}

function sanitizeString(string: string) {
  // not the best way to sanitize strings, but it's good enough for this example
  const replacements = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }
  const reg = /[&<>"'/]/gi

  return string.replace(
    reg,
    (match) => replacements[match as keyof typeof replacements],
  )
}
