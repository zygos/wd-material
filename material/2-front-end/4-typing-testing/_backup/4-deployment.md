Part 4: SPA Deployment

# Part Description

We will top off our front-end module by introducing some methods for structuring our git commit messages and deploying our application to GitHub Pages using an automated workflow.

# Key learning topics & resources for this part

## Conventional commits (1 hour)

Conventional Commits is a specification for structuring commit messages. It is a simple set of rules that makes it easier to understand the purpose of a commit by looking at its commit message. This helps to create release notes in versioned projects and to track down breaking changes and what each developer worked on.

Watch the short introduction video on [Conventional Commits](https://www.youtube.com/watch?v=OJqUWvmf4gg). It provides an example of generating changelogs from commit messages, which is helpful if your project is versioned. For example, it is a package library published on npm and relied on by other projects.

Read the information on the [Conventional Commits](https://www.conventionalcommits.org/). It provides an excellent explanation of the specification and how to use it. While reading the complete specification is a good idea, it goes into a lot of detail that is unnecessary to understand the specification's basics.

We recommend thinking about the commit message structure. Here are some basic examples:

| Prefix | Usage | Example |
| --- | --- | --- |
| chore: | Project maintenance | `chore: update dependencies` |
| ci: | Deployment pipeline. | `ci: add Playwright to actions` |
| content: | Updated static page content | `content: add DE translations` |
| docs: | Documentation. | `docs: add a section on project setup` |
| **feat:** | Add a (partial) feature | `feat: add login page` |
| **fix:** | Fix previously broken/incomplete feature | `fix: broken image carousel` |
| perf: | Performance, no change to functionality. | `perf: add token cache` |
| refactor: | Code reuse and readability | `refactor: simplify user role parsing` |
| revert: | Revert a change. | `revert: update Node SASS version` |
| **style:** | Styling change of an existing feature. | `style: revamp settings modal` |
| **test:** | Updating tests | `test: E2E for client search` |

Just focus on the prefix and the command-like ["imperative mood"](https://git.kernel.org/pub/scm/git/git.git/tree/Documentation/SubmittingPatches?h=v2.36.1#n181) of the message. Adding a scope and commit description is unnecessary, often even in larger projects. It would be best if you did not spend so much time on commits that you become discouraged from using them often. If writing a commit message takes you more than 20 seconds, you may be overthinking it. If it takes you less than 2 seconds, you are probably not thinking enough.

Here are some more examples of what would be usually considered a lacking commit message and how it could be improved:

| Bad | Better |
| --- | --- |
| updated topbar | feat: add login and logout buttons to TopBar |
| fix: design | fix: unusable Tooltip position |
| added tests | test: financing page flow |
| cleanup | chore: remove unused utility |

**Pro tip:** Every time you use a "minor changes" commit message, a bird falls out of their nest. Please think of the birds.

You can check various open-source projects to see how they are using Conventional Commits:
- [Angular](https://github.com/angular/angular)
- [Deno](https://github.com/denoland/deno)
- [Electron](https://github.com/electron/electron)
- [Next.js](https://github.com/vercel/next.js)
- [Node](https://github.com/nodejs/node)
- [Playwright](https://github.com/microsoft/playwright)
- [Svelte](https://github.com/sveltejs/svelte)
- [Vue](https://github.com/vuejs/vue)
- ...many more

**Alternative:** Conventional commits are not the only way to structure your commit messages. For a playful alternative, you can check out [Gitmoji](https://gitmoji.dev/) and how it is used in a popular Python back-end framework called [FastAPI](https://github.com/tiangolo/fastapi) and how an emoji-backed [changelog looks like](https://github.com/tiangolo/fastapi/releases/tag/0.101.0).

From now on, you will be expected to use some commit message structure, preferably Conventional Commits. Though, a gitmoji is also acceptable as long as you use it in a consistent and structured manner.

## Deployment

One of the benefits of a Single Page Application with no server-side rendering is that it can be deployed on a static hosting service without a dedicated server running just for our application. You can deploy your application on various static hosting services, such as GitHub Pages, at no cost.

## Exercise: Publishing a Vite project on GitHub Pages (2 hours)

The most straightforward way to deploy our application would be to run `npm run build` and upload the contents of the `dist` folder to a static hosting service. That is a decent approach, but it is not very convenient.

Ideally, we would like to push our changes to GitHub and have our application automatically built, tested, and deployed wherever we want. This is where GitHub Actions come in.

GitHub Actions allows us to specify various workflows that certain events will trigger. For example, we can define a workflow that GitHub will run every time we push to the main branch. This workflow can run various commands, such as `npm run build` and `npm run test`, and it can deploy our application to GitHub Pages.

Today, we will try out a GitHub Action workflow to automatically build and deploy our application to GitHub Pages. This will allow us to deploy our application with a single push to GitHub.

Moreover, this workflow will be reusable for any other Vite project we want to deploy to GitHub Pages (or other hosting service).

We will only go into detail about GitHub Actions as it is an extensive topic, and we don't need to know all the details to get our application deployed. We will use a template that will get the job done.

**Note:** you might find online some guides on how to deploy to GitHub pages using a special `gh-pages` branch. This is an approach that is not recommended as it is not very flexible and GitHub [intends to migrate away from it](https://github.com/orgs/community/discussions/27676#discussioncomment-3302829). We will use a more modern approach using GitHub Actions.

1. Create a new **public** GitHub repository.
2. `git clone` the repository in your machine and create a new Vue project with TypeScript, Router, Vitest, Playwright, ESLint, and Prettier.
3. `npm install` and make sure you can run the project locally with `npm run dev`.
4. Go to your GitHub project's Settings tab. Select Pages in the sidebar. Under the Source section, which should be at the top, select "GitHub Actions". Also, open Actions in the Settings page sidebar and make sure you have "Allow all actions and reusable workflows" selected.
5. Add the GitHub Actions file `.github/workflows/deploy.yaml` using the template provided in [Vite GitHub Pages guide](https://vitejs.dev/guide/static-deploy.html#github-pages). At the moment of writing, it is the following:

```yaml
# Simple workflow for deploying static content to GitHub Pages
name: Deploy static content to Pages

on:
  # Runs on pushes targeting the default branch
  push:
    branches: ['main', 'master']

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# Sets the GITHUB_TOKEN permissions to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow one concurrent deployment
concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  # Single deploy job since we're just deploying
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          # Upload dist repository
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

This template will inform GitHub what it should do when we push to the main branch. It will run a workflow to install dependencies, build the project and deploy it to GitHub pages.

6. Our page will be deployed to our GitHub Pages username subdomain subdirectory, such as `https://<your-github-username>.github.io/<your-repository-name>/`. At the moment `npm run build` is run, by default, our application will be built with a base path of `/`, and it will have all the links and assets prefixed with this base path. We want to inform Vite that it should use our repository name as the base path. To do this, we need to add the following line to our `vite.config.js`:

```ts
export default defineConfig({
  base: '/<your-repository-name>',
  // ...
})
```

Though, this seems instead "hard coded". Is there a way to make it more dynamic? Yes, there is! GitHub provides various [environment variables](https://docs.github.com/en/actions/learn-github-actions/variables) that we can use in our workflows. We can use the `GITHUB_REPOSITORY` environment variable. GitHub Actions provide this variable and contains the repository's name in the format `<your-github-username>/<your-repository-name>`. We can use this variable to set the base path in our `vite.config.ts`:

```ts
export default defineConfig({
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/',
  // ...
})
```

Now, if there is a `GITHUB_REPOSITORY` environment variable, we will use it to extract the base path. If there is no such environment variable, for example, we are building a project on our machine, we will preserve the default base path of `/`.

This tiny config would work with every repository we deploy to GitHub Pages while still working locally.

7. Add, Commit, and Push the changes to GitHub - practice using conventional commits. You might want to use the `ci:` prefix in this case.

This should trigger the deployment workflow visible in the "Actions" tab on your GitHub repository page.

8. Go to the Actions tab and check the status of the latest workflow. It should result in a successful deployment marked with a green checkmark. If you click on the workflow or you click on the "Deployments" in the workflow list, you should see a link to your deployed application which will be something like `https://<your-github-username>.github.io/<your-repository-name>/`. If you open that link, you should see your application deployed on GitHub pages.
9. Now, you can use your deployed application hosted on GitHub pages! 🥳 There is just one annoying issue. If you visit any other path in your application and load it "fresh" by performing a refresh, you will get a "404 - Not Found" error. This is because we only have an `index.html` file which is served for the root path ('/') but not for every other path, such as `/about`.

We want to let our JavaScript handle all our routes on the client-side. Luckily, GitHub Pages provides a (slightly hacky) way for us to address this issue with a custom `404.html`. This file will be served as a response for every request that can not be resolved with an existing file in our `dist` folder.

Let's create a catch-all page by adding the following step to our workflow file after the `npm run build` step:

```yaml
  - name: Create 404 page
    run: cp ./dist/index.html ./dist/404.html
```

This step copies the generated `index.html` to a new `404.html` file which GitHub pages will use for all paths it can not handle. Push this change to GitHub. This should trigger the deployment workflow.

Once our deployment is finished, we can visit any path in our application, and our SPA will handle it. 🎉

**Note:** Since we are routing on the client-side, the server still has no idea which HTTP code to return for a given path. The server will return a 404 HTTP code for all non-'/' paths. We need to live with this since GitHub does not yet allow serving [all paths as 200 OK](https://github.com/orgs/community/discussions/27676). A solution to this issue is out of scope for this sprint as this does not affect our application beyond a complaint in the browser console.

## Running tests on GitHub Actions (2 hours)

We want to ensure that we are not pushing a broken application to GitHub pages. Given that we have at least a few tests we can trust, we can use them to verify that our application is working as expected.

While developing locally, we can run our tests manually with `npm run test:unit` or `npm run test:e2e` (scripts configured for us by Vite in `package.json` file). But if we are pushing to GitHub, we would like to ensure that these commands are run automatically and that we are not publishing a broken application.

We will have some time to explore GitHub Actions in the future, so we will use an appropriate template to get the job done without going into too much detail.

1. Update the `.github/workflows/deploy.yaml` file `jobs` sections with the following content:

```yaml
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      ## Setup
      - name: Checkout
        uses: actions/checkout@v3
      - name: Set up Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      - name: Install dependencies
        run: npm install

      ## Lint
      - name: Run linters
        run: npm run lint

      ## Unit tests
      - name: Run unit tests
        run: npm run test:unit

      ## Build the source code
      - name: Build
        run: npm run build
      - name: Create 404 page
        run: cp ./dist/index.html ./dist/404.html
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          # Upload dist repository
          path: './dist'

      ## E2E test our built application
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run E2E tests
        run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7

      ## Deploy
      - name: Setup Pages
        uses: actions/configure-pages@v3
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

This will add three new steps to our workflow:

- Run ESLint for linting
- Run unit tests using Vitest
- Run E2E tests using Playwright

2. We should also inform Playwright about our custom base path. We can do this by adding the following line to our `playwright.config.ts`:

```ts
// after our imports, let's add a small function that will dynamically
// form our baseURL
const formBaseURL = (baseURL: string) => {
  const repo = process.env.GITHUB_REPOSITORY
  const basePath = repo ? `/${repo.split('/')[1]}/` : ''

  return `${baseURL}${basePath}`
}

// find the line where baseURL is defined and replace it with:
baseURL: formBaseURL('http://localhost:5173'),
```

Now, Playwright will not be confused by our base path not being '/'.

3. Finally, due to how Playwright merges URLs, we need to use relative paths in our URLs instead of absolute paths. For example:

```ts
test('visits the app root url', async ({ page }) => {
  // instead of /
  // await page.goto('/');

  // we need to use ./
  await page.goto('./');

  await expect(page.locator('div.greetings > h1')).toHaveText('You did it!');
})
```

Now our custom base path will be correctly merged with our navigation paths.

Push the changes. After every push to the main branch, our application will be built, tested, and deployed to GitHub Pages.

If any of the workflow steps fail, a new deployment will not be triggered. We can click on the failed workflow, check the logs to see what went wrong, and even download the artifacts (e.g., Playwright report and traces with screenshots) to help us debug the issue if we cannot reproduce it locally.

This is a very basic workflow, but it is a good starting point. It removes all the "it works on my machine" issues, as our application is built and tested fresh every time we push a change. It must work on a clean machine. Otherwise, it does not work at all.

**Note:** A Playwright test will produce as a "playwright-report," which we can find by opening up the detailed view of our workflow. If we copy the report's contents to our project's "playwright-report" folder and run `npx playwright show-report` in the command line, we will see the test report in our browser. You can find more information on this in [Playwright documentation](https://playwright.dev/docs/ci-intro#viewing-the-trace).

# Directions for further research (1 hour+)

- What are "artifacts" in GitHub Actions?
- What if you want to use GitHub Actions for testing but not deployment? How could you update your GitHub Actions to run tests to remove the deployment step?
- How could you update your GitHub Actions to run tests for every branch?
- What type of application would you not be able to deploy to GitHub Pages? Why?
- What are the benefits of running tests on GitHub Actions compared to running them locally?

## (Optional) Deployment to an external service (2 hours)

If you have a free GitHub account, you cannot publish private repositories to GitHub Pages. We need a GitHub paid membership if you want to deploy a private repository. This is a great opportunity to consider other hosting services with more features. For example, you can use [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/), which provide free static hosting and offer more control over deployment. How could you update your GitHub Actions and repository variables to deploy your project to Netlify or Vercel instead of GitHub Pages?
