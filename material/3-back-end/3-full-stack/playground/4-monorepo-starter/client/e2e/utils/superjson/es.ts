// Playwright has issue with ES module imports that are present
// in SuperJSON. This is a workaround for that.
// Issue: https://github.com/microsoft/playwright/issues/17075
import superjson from 'superjson'

export { superjson }
