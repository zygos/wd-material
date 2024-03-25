Ideas:

- restruktūrizuoti, kad build'ina iškart nuo full-stack web app

MUST: Add instructions on what to ask during live coding in 3.3.
MUST: Have fewer approaches that are simpler to understand.
  -> Simplify: Tic Tac Toe 2.2.2 hands-on.
  - It's quite hard to switch to front-end in the back-end.
  - Capstone with front-end.
  - Capstone with back-end.

  From Node to Specialisation.

JavaScript:
- https://javascript.info/

Struggled a lot.

- C -> JS?
- Rip out python, replace with JS, more exercises on Hackerrank. Then TypeScript.

- Remove some very specific topics. Kysely, TypeORM. It would be enough to use one of those. Other one for specialisation.
Right now learning a very thin layer of everything.

Everything is a bit deeper and there is more time to learn any specific topic.

---

Module 1 is so simple.
Module 2 is drastically harder. Especially with Vue to learn the framework.
Module 3 is even harder. A lot harder.

---

Exercises by other providers are pretty good. There are tests and a solution. It's the fastest way to learn.

---

Grid:
- https://grid.malven.co/

Then exercises by STLs are pretty good but they get a bit complex.
There should be more steps.

Step-by-step hands-on.


What is a server?

- https://www.youtube.com/watch?v=VXmvM2QtuMU

Dependency injection:

- https://www.youtube.com/watch?v=tYZd8hserms (Luca shared)

JS Closures:

For anyone interested in Closures, Scope and Execution Context:

Challenges: http://csbin.io/closures

Solutions: https://github.com/FrontendMasters/fm-snippets/blob/main/javascript-hard-parts-v2/closures.js

Node: https://nodejs.org/en/learn/getting-started/introduction-to-nodejs

Design patterns in JS/TS:
- https://www.youtube.com/watch?v=tv-_1er1mWI

REST APIs:

- Kaip naudoti schema
- Mock'inimas

Provide some mocking examples for Discord.

Teach about debugging and launching node with "DEBUG=*"

https://web.dev/learn/
https://quickref.me/javascript
https://quickref.me/docker
https://quickref.me/es6
https://quickref.me/pm2
https://quickref.me/postgres

Docker:
- https://www.youtube.com/watch?v=rIrNIzy6U_g

Explain Many-to-Many relationships before TypeORM.

JS + TS debugging VS Code kaip requirement kažkurio sprint project.

tRPC:

- createCallerFactory instead of createCaller
- kaip įmanoma call'inti iš postman
- trpc panel

Error Propagation and Handling

Flexbox & Grid:
- https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/
- https://www.joshwcomeau.com/css/interactive-guide-to-grid/

Color formats:
- https://www.joshwcomeau.com/css/color-formats/

Show step-by-step what is happening when you run a piece of code. Inspect it with a debugger and with a trace (profiler).

TypeScript for beginners:
- https://learntypescript.dev/
- https://www.totaltypescript.com/tutorials/beginners-typescript
- Zod: https://www.totaltypescript.com/tutorials/zod
- Solving TypeScript errors: https://www.totaltypescript.com/tutorials/solving-typescript-errors
- https://typescript-exercises.github.io

On refactoring and code smells:
https://refactoring.guru/refactoring

JavaScript:
https://eloquentjavascript.net/

O'Reilly:
- Designing Data-Intensive Applications

Debugging in Chrome DevTools:
- https://www.youtube.com/watch?v=Y3u2groOG-A

OOP:
- https://blog.sigma-star.io/2024/01/people-dont-understand-oop/

TypeScript:
- https://typescript-exercises.github.io/

Vue: mokyti computed:
```ts
// const startingBalance = ref()
// const currency = ref()

// watch(
//   () => store.settings.startingBalance,
//   (newValue) => {
//     startingBalance.value = newValue
//   },
//   { immediate: true }
// )
// NOTE:
const startingBalance = computed(() => Number(store.settings.startingBalance))

// watch(
//   () => store.settings.currency,
//   (newValue) => {
//     currency.value = newValue
//   },
//   { immediate: true }
// )
const currency = computed(() => store.settings.currency)
```

---

- as junior developers you will very rarely work on something from scratch. Most of the time you will be working on existing codebases, fixing bugs, adding new features, etc. So it is important to learn how to read and understand code written by other people.

3rd module specializations:

- Next.js

Maksimaliai kažkuriai įmonei:
Telesoftas, Vinted.

React stack:

- Node.js - Express.js | Nest.js
- React

trpc-panel

--- --- ---

- PHP (Symfony)
- RoR

---
