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

2024-05-02:

Eli:
- It's quite interesting. I like that programming part is accentuated.
- Replacing Module 1 with JS is a good idea, but including HTML and CSS is a good idea.
- Starting with HTML and CSS is a nice idea to pick up some momentum.
- HTML, CSS, JS. Focus on nailing the JS knowledge. If I was an engineering manager, what I would like to see is a good understanding of JS.
- Most companies segregate front-end and back-end. Full-stack is usually for Next, Gatsby, etc.
- Restructuring the whole course is not ideal.
- Replacing CS50 videos with basic YouTube videos is not great as we can't control the content. Looking for a sustainable program that isolates the core programming concepts - freeCodeCamp, The Odin Project, etc.
- Issue is that we have a time schedule to keep.
- We should still rely on free open-source content. freeCodeCamp, CS50, The Odin Project, Exorcism, etc. Look for good open source material. It is dry, we can film videos on top of that.

Z:
- I agree with proposed structural changes.
- I think we all can agree on the general ideas. Livestreamed coding hands-on exercises.
  - I love exploring best possible solutions. I had various ideas on course structure, exercises, interactivity etc. It is limited by real-world constraints. What are the constraints?
  - I would like to see more concrete proposals how to move forward.

Ed:
- I would like to have content on the platform that we can figure things out in a sandbox directly in the page.
- I liked Total TypeScript course.

--- --- ---

- Updated Module 3 Sprint 4 & 5 for V2 and V1. No structural changes, streamlined some exercises, simplified some material parts, hands on guides and provided templates to address common pitfalls when building and deploying the project.

- We had some ideas for system design interviews.
- No mock interviews scheduled this week yet. There was one at an unfortunate time last week.
  Though, maybe for the best as the learner did not pass, so it might have been not the best example of a mock interview.

- Issues with moving TypeORM to Node specialisation:
  - It is not worth a sprint on its own.
  - Attaching it to any existing part seems a bit out of place.
- Possibly, even moving to a different framework, maybe Nest.js?

- First learner finished the course - Luca.

- 13th day panel chat:
  - Web development learners.
  - Temper salary expectations.

- Turing learners: Above the market's junior position level. Somewhere between junior and entry mid-level.

- Current learners: Through standups I heard through the great vine, that a 4 - 5 already got accepted to junior positions, at least Vinted academies, paid internships. Vinted, Danske, Swedbank...

Market conditions:
  - A large part of the hiring drought is caused due to the market correction to the post-COVID tech boom. So you have steeper competition for the same positions. Which is fine.
  - The market salary growth has simply slowed down, maybe stagnated for the past year. It is still by a few standard deviation or two above the average salary for most other profession, especially in Lithuania.

  - If you compare everything to the previous boom, it might seem like a bust. But if a bust is just a few years of stagnation, then it's not that bad.

AI:
  - Another of the floated topics was AI and its role. I noticed some learners fear AI, even in the short-term. Especially for the junior level. Which, at least for the next few years, should be an accelerator for the learning.
  - Developers with AI will replace developers without AI.
  - With AI, you have to start moving early to the mid-level positions.
  - Solution designers. Blacksmiths used to come up with the design and then implementing it. Now, the technology has eliminated the need to do many things by hand. The paradigm of "artisan developer" might be replaced by "solution designer".

Need of software in the world, I think, is still growing. The local correction should not be mistaken for a global trend. Just like the dot-com bubble. The bubble burst, but the internet did not go away.

---

- When teaching OOP, develop a new class in an existing project.
- When teaching requests, develop a middleware in an existing project.
- When teaching SQL, connect to the database and the next step - rework this into a Postgres connection.
- Develop a custom component in Vue (or other SPA), like <Button>, etc.

Teaching to use reuasble components.

---

Update CS50 course to 2024 version.

Add Cybersecurity:
- https://cs50.harvard.edu/x/2024/weeks/10/

TypeScript error handling:
- https://byby.dev/ts-try-catch-error-type

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
