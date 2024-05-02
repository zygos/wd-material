## Using Vue Test Utils and Testing Library

Here we present a component test. You will not need to write component tests yourself, but we would like you to familiarize yourself with the syntax and the concepts.

In this exercise, you will find 2 test files for the same component:

- `TaskManager.tl.spec.js` uses Testing Library
- `TaskManager.vtu.spec.js` uses Vue Test Utils

Both test files are identical in terms of the tests they run. The only difference is the testing library they use. Vue Test Utils follows a more traditional approach to testing Vue components, while Testing Library enforces user-centric testing by discouraging the use of component and stylistic CSS selectors.

## Utility Functions

We have some utilities at the end of this test file to make our tests more readable, less repetetive and less prone to bugs due to selector typos.

In practice, a small test file like this would not need this level of abstraction. Tests do not need to be as DRY as your main business logic. As long as you do not repeat very long blocks of code, you are fine.

Nevertheless, to illustrate the possible use of utilities, without introducing the complexity of a larger test suite, we have added some utility functions while still dealing with a small component.
