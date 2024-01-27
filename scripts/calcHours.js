// const topics = `
// ## Automated Testing (0.5 hours)
// ## Test-Driven Development (TDD) (1 hour)
// ## Exercise: Refactor (2 hours)
// ## Exercise: Red-Green-Refactor (2 hours)
// ## End-to-end testing (2 hours)
// ## Exercise: TDD E2E testing with Playwright (2 hours)
// ## Double Loop TDD (0.5 hours)
// ## Exercise: Adding a unit test (1 hour)
// ## Front-end Testing Q&A (1 hour)
// ## (Optional/Advanced) TDD and Application Design (1 hour)
const topics = `
## Conventional commits (1 hour)
## Deployment
## Exercise: Publishing a Vite project on GitHub Pages (2 hours)
## Running tests on GitHub Actions (2 hours)
## (Optional) Deployment to an external service (2 hours)
`.split('\n')
.filter(Boolean)
.map(line => line.slice(3))
.filter(line => line.includes(')'))
.map(line => line.match(/(?<topic>.+) \((?<hours>[\d.]+)\+? hours?\)/))
.map(matches => matches.groups)
.map(({ topic, hours }) => ({
  topic: topic.trim(),
  hours: Number(hours),
}))

const total = topics.reduce((sum, { hours }) => sum + hours, 0)

console.log(total)
