### Module 2: Basics of Frontend Web Development

#### Sprint 1: Introduction to HTML, and CSS

[CS50 Week 8](https://cs50.harvard.edu/x/2023/weeks/8/) (4 hours)

Scenario: You've recently started working at a travel agency. You have just received an email from your project manager informing you that you will need to start working on a travel agency website redesign. However, you realize you need to learn more about front-end web development. So, you decide to start a crash course that covers everything you need to know to accomplish this task - how do websites work, what's HTML, CSS, and how to use them to build a website?

1. Internet
- IP and DNS (1 hour)
- Inspecting requests with Developer Tools (1 hour)
- Exploring Developer Tools (1 hour)
- Making requests (1 hour)

2. HTML
- Introduction to HTML (1.5 hours)
- HTML tags and elements (2 hours)
- HTML examples (1 hour)
- Working with HTML Forms (1 hour)
- Meta tags (0.5 hour)
- Accessibility best practices (0.5 hour)
- Inspecting page structure with Dev Tools (0.5 hour)
- Exercises (1 hour)
- New HTML features and browser compatibility
- A new email from your project manager - booking form (2 hours)

3. CSS
[CS50 CSS Short](https://cs50.harvard.edu/x/2023/shorts/css/)
- CSS example
- Syntax, Classes, Pseudo-Classes, and Properties (2 hours)
- CSS selector game (1.5 hours)
- CSS Properties Reference (0.5 hour)
- Responsive Design, Media Queries and Mobile-first design (1 hour)
- Layout Techniques: Flexbox and Grid (1.5 hours)
- Layout Techniques Practice: Flexbox and Grid (3 hours)
- Bootstrap (0.5 h)
- Advanced (optional)
- A new email from your project manager - responsive form layout (2 hours)

4. Hands-on: Copying a design
- Mobile-first CSS styling
- Adding pictures, video embeds
- Implementing accessibility best practices

5. Practical project: Travel site
- Implement mobile-first design with responsive layout
-> Graded project

#### Sprint 2: Introduction to JavaScript

[CS50 Shorts: JavaScript](https://cs50.harvard.edu/x/2023/shorts/javascript/)
1. JavaScript Fundamentals
- Setup your local environment (Linux, Mac, or WSL on Windows)
  - Install Node (LTS version)
  - VS Code Extensions:
    - `Quokka.js` for exloring JavaScript
    - `ESLint` for code linting
    - `Live Server` for live reloading
    - `Trailing Spaces` for highlighting trailing spaces
    - `vscode-icons` for file icons
    - `WSL` if you're using WSL on Windows
- Introduction to JavaScript
  - Syntax and Variables (var, let, const)
  - Conditionals and Loops
  - Strings (methods, template literals)
  - Arrays and Objects (methods, destructuring)
- Functions
  - Function declaration and expression
  - Arrow functions
  - Default parameters
  - Callbacks
  - Async functions
  - Promises
- Error Handling (try-catch)
-> Quiz


2. OOP and FP Patterns in JavaScript
- Objects, Prototypes, and Classes
- Immutability and Mutability
- Array methods (map, filter, reduce, some, every, find, findIndex, flatMap)
- Closures, Scope, and Context
- Advanced: Recursion
- Expert: Higher-order functions and currying
-> Quiz

3. DOM Manipulation
[CS50 Shorts: DOM](https://cs50.harvard.edu/x/2023/shorts/dom/)
{ CS50W Week 5 }
- DOM tree and Element selection
- Events and Event handling
- Updating DOM elements
- Bonus: jQuery
-> Quiz

4. Hands-on: Vanilla JavaScript Todo List
- Local Storage
- Fetch API
- Implement DOM manipulation and simple JavaScript patterns in the project
-> Hands-on

5. Practical project: Book Store
- Create a book management web application using plain JavaScript
- Implement features: Add, edit, delete, and search books
- Apply functional programming patterns learned in the sprint
-> Graded project

#### Sprint 3: Single-Page Applications (SPAs) & Introduction to Vue 3

1. Introduction to Single-Page Applications (SPAs)
- Package managers (npm, yarn)
  - Semantic versioning
- Concept of SPAs
- Advantages and disadvantages
- Popular SPA frameworks (React, Angular, Vue, Svelte)
- Practical use cases for SPAs

2. Vue 3 Fundamentals
- Overview of Vue 3
- Component-based architecture
- Vue instance, components, and templates
- Vue directives (v-model, v-if, v-show, v-for, v-on, v-bind)
- Props, events, and slots

3. Vue 3 Composition API
- Introduction to the Composition API
- Refs and reactive
- Computed properties and watchers
- Watch and watchEffect
- Lifecycle hooks in Composition API
- Creating and using custom hooks (composables)

4. Hands-on: Building a Vue 3 App (include some particular app scenario)
- Creating components and utilizing Composition API features
- Routing and navigation with Vue Router

5. Practical project: SPA with Vue 3 (include some scenario)

#### Sprint 4: Advanced Front-end Tools and Project Management

1. Introduction to Build Tools and Code Quality
- Build tools: Webpack, Vite
- Transpiling (Babel)
- Code Linting and Formatting (ESLint, Prettier)
- CSS pre-processing chain (Stylelint for SCSS)
- Advanced: Introduction to TypeScript
-> Quiz

2. State Management and Data Persistence
<!-- - Introduction to state management (Vuex) -->
- Storing and retrieving data with localStorage
- Multi-tier state (API, localStorage, in-memory)
- Handling asynchronous operations in Vuex
-> Quiz

3. Test-driven Development and CI/CD
- Introduction to test-driven development (TDD)
- Unit tests, component tests (using Jest)
- E2E tests (using Cypress)
- Writing and running tests for a Vue 3 application
- Continuous integration and deployment (CI/CD) {CS50W Week 7 57:15 - 1:18:50}
-> Quiz

4. Gitflow
- Working with branches
- Gitflow (simplified, regular, GitHub flow)
- Setting up Gitflow
- GitHub Actions
-> Hands-on: Setup a CI/CD pipeline

5. Efficient Project Management and Planning
- Agile principles and project management
- Breaking down project tasks and planning sprints
- Estimating task time and effort

#### Sprint 5: Web Application

1. Capstone Project: Vue 3 App, External API, data persistance, tests, and CI/CD pipeline
- Create a Vue 3 project implementing functional programming patterns, a build tool (Vite or Webpack), E2E tests (Cypress), code linting, localStorage, external API(s), and Gitflow (or a variation of it)
- This comprehensive project will serve as a primary portfolio piece
-> Graded Capstone
