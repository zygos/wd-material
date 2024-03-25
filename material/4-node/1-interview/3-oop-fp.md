Part 3: OOP and FP patterns

# Part introduction

You've dabbled with classes and some functional ideas. Now, it's time to level up your understanding of both. 🌟

Up until this point we have been dealing primarily with **procedural programming** and some FP and OOP sprinkled in. In this part, we will dive deeper into the world of **Object-Oriented Programming (OOP)** and **Functional Programming (FP)**.

Node.js offers a playground like no other, where the lines between OOP and FP blur, allowing you to mix and match these paradigms to solve problems in innovative ways. Whether it's crafting elegant class structures or weaving functional patterns into your code, you'll find that mastering both worlds can supercharge your development process.

**Goals:**
- Deepen your understanding of OOP and FP concepts and their practical applications.
- Learn to identify scenarios where one paradigm may offer advantages over the other.
- Be able to apply function composition to build functions from functions.
- Be able to pick out appropriate OOP patterns for common problems like logging, authentication

**Limitations:**
- While we aim to provide a solid foundation, remember that mastery comes with practice. We will stretch the horizons, but it will take time for you to feel comfortable with these new ideas.
- We'll focus on concepts most relevant to Node.js development. The vast world of OOP and FP is full of nuances that we won't cover exhaustively.
- Some advanced topics in both paradigms might only be touched upon lightly. We encourage you to explore these further on your own.
- You will not be able to explain what a monad is.

Let's jump in!

# Key learning topics & resources for this part

## Functional programming (1 hour)

- Watch: [Functional Programming](https://www.youtube.com/watch?v=nuML9SmdbJ4) (20 mins)

We have already used some practical functional programming "utilities" in the previous parts of the course, such as `map`, `filter` and `reduce`. However, we haven't yet discussed the core concepts of functional programming (FP) in depth.

In contrast to OOP, Functional Programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data. It's a declarative programming paradigm, which means programming is done with expressions or declarations instead of statements.

Given that you are dealing with functions every day, you might have already considered yourself familiar with Functional Programming (FP). However, this is quite far from the truth.

```js
// Just as this is not OOP
const object = {}

// So is this not FP
function doSomething() {}
```

FP is a style of declarative programming that emphasizes the use of pure functions applied in a sequence to solve complex challenges. Unlike object-oriented programming, it avoids relying on shared state and mutable data.

Overall, FP is a less common paradigm in the industry, especially enterprise software development, but it's gaining popularity, especially in the context of modern web development. It's also a great way to write more predictable and testable code. However, since JS lacks immutability by default, it's not a perfect fit for FP, so it's best to use it in moderation.

FP has a few key concepts that you should be familiar with:

- **Pure functions**: Functions that always return the same result for the same arguments and do not have any observable side effects. This makes them easier to test and reason about.

```ts
// Example of a pure function
function add(a, b) {
  return a + b
}
console.log(add(2, 3)) // Always returns 5

// Example of an inpure function
let c = 10
function addImpure(a) {
  return a + c
}

console.log(addImpure(2)) // Returns 12
c = 20
console.log(addImpure(2)) // Returns 22
```

- **Immutability**. Mutation is just a fancy word for changing something. Immutability means not changing the original value (or more precisely, not being able to change it).

In JS, the only immutable values are primitives, such as number. You can not change the value of a number, you can only point a variable to a different number. Everything else can be changed, so we need to take care to not mutate objects and arrays.

```js
// Example of not mutating the original object:
const user = { name: 'John', age: 30 }
const userUpdated = { ...user, age: 31 } // creates a new object

// Mutating the original object, which is against the FP principles:
const user = { name: 'John', age: 30 }
user.age = 31
```

- **First-class functions**: Functions that can be assigned to variables, passed as arguments, and returned from other functions.

- **Higher-order functions**: First order functions closely related to the concept of higher-order functions. A higher-order function is a function that takes another function as an argument, returns a function, or both.

```ts
// Without higher order function
const numbers = [1, 2, 3]
const squared = []
for (let i = 0; i < numbers.length; i++) {
  squared.push(numbers[i] * numbers[i])
}

// With higher-order function
const numbers = [1, 2, 3]
const square = number => number * number
const squared = numbers.map(square)
```

- **Function composition**: The process of combining two or more functions to produce a new function.

```js
// Define two simple functions
const double = x => x * 2
const increment = x => x + 1

// Compose the functions to create a new function
const pipe = (f, g) => x => g(f(x))
const doubleThenIncrement = pipe(double, increment)

// Use the composed function
console.log(doubleThenIncrement(3)) // Outputs: 7 (3 * 2 + 1)
```

- **Partial application and currying**: The process of converting a function that takes multiple arguments into a sequence of functions that each take arguments one at a time. This pattern often relies on placing the "data" argument last and the more static "configuration" arguments first.

```js
// Partial application using bind:
// create a new function with the first
// argument "filled in"
const add = (a, b) => a + b
const addTen = add.bind(null, 10)

console.log(addTen(2)) // Outputs: 12

// curried - a series of functions
// that each take one argument
const add = a => b => a + b
const addFive = add(5)

console.log(add(3)) // Outputs: 8

// We could even have a function that
// automatically curries any function
const add = curry((a, b) => a + b)

console.log(add(3, 2)) // Outputs: 5
console.log(add(3)(2)) // Outputs: 5
```

- **Recursion**: Recursion is a technique where a function calls itself in order to solve a problem.

```js
// A recursive function to calculate the factorial of a number
function factorial(n) {
  if (n !== 0) {
    return n * factorial(n - 1); // Recursive case
  }

  return 1; // Base case
}

console.log(factorial(5)); // Outputs: 120
```

FP results in very expressive code that quickly communicates the intent of the code. It's also elementary to test. However, it can be challenging to understand for developers unfamiliar with the paradigm. Also, it often leads to breaking down problems into tiny functions and lots of function composition, which can be hard to follow and is less efficient in terms of performance.

Taken to an extreme, this leads to a tacit (or point-free) style, where there are no arguments and no intermediate variables:

```js
// import { ... } from 'ramda'

// getFastestCar is a function that takes
// a list of cars and returns the name of
// the car with the highest horsepower.
const getFastestCar = pipe(
  sortBy(prop('horsepower')),
  last,
  prop('name')
)
```

Though, this is an extreme example and not recommended for most codebases. Here is a more practical example that would resemble your daily work:

```js
const amountTotal = orders
  .map(order => order.payment)
  .filter(payment => payment.status === 'paid')
  .reduce((sum, payment) => sum + payment.amount, 0)
```

## Functional programming exercises (3 hours)

- Exercises: [FP exercises](https://drive.google.com/file/d/1USdgC3umffHXLcnIFIspf3cENJu6rsui/view?usp=sharing)

## OOP programming (2.5 hours)

A brief reminder of the key concepts of OOP:

- Watch: [Object Oriented Programming in JavaScript](https://www.youtube.com/watch?v=aAAS9cEuFYI) (1.5 hours)
- Watch: [Encapsulation and "static"](https://www.youtube.com/watch?v=WAo7Mx8Nnos) (1 hour)

The first video here presents the key differences of OOP in JS compared to other languages. It gradually introduces how functions, objects and prototypes work in JS, and how they are mapped to class-based OOP syntax.

## Exercises: OOP programming (1.5 hours)

- Exercise: (Warm up) [Exercise](https://github.com/Nooder/javascript-in-depth/blob/main/038-classes-oop-intro/exercises/exercise-2.js) | [Solution](https://github.com/Nooder/javascript-in-depth/blob/main/038-classes-oop-intro/exercise-solutions/exercise-2.js) | [Walkthrough](https://youtu.be/GEfh_B_JAl0?si=xfE1WAtfu4bEqU5a&t=945) (30 min)
- Exercise (Inheritance): [Exercise](https://github.com/Nooder/javascript-in-depth/blob/main/039-classes-oop-inheritance-polymorphism/exercises/exercise-1.js) | [Solution](https://github.com/Nooder/javascript-in-depth/blob/main/039-classes-oop-inheritance-polymorphism/exercise-solutions/exercise-1.js) | [Walkthrough](https://youtu.be/b-xlD981pic?si=tBMT-AGEJCfK_oUw&t=704) (30 min)
- Exercise (Polymorphism): [Exercise](https://github.com/Nooder/javascript-in-depth/blob/main/039-classes-oop-inheritance-polymorphism/exercises/exercise-2.js) | [Solution](https://github.com/Nooder/javascript-in-depth/blob/main/039-classes-oop-inheritance-polymorphism/exercise-solutions/exercise-2.js) | [Walkthrough](https://youtu.be/b-xlD981pic?si=g3GrF1exiX6OAaFd&t=1938) (30 min)

For these exercises you can opt to use plain JavaScript or you can jump straight to TypeScript.

## OOP programming patterns (2 hours)

- Resource: [Design patterns in TypeScript](https://refactoring.guru/design-patterns/typescript): Adapter, Facade, Observer, and Strategy patterns (2 hours)

The Design Patterns page contains a lot of information, and reading it all at once will be overwhelming and unnecessary. Realistically, you could only learn some of these patterns from the get-go.

Instead, focus on a few key patterns that are most common in Node.js development:

**Structural Patterns**:

- **Adapter**: Allows incompatible interfaces to work together. This is useful when you need to integrate new features or components with existing code that cannot be modified. Another use case - when you need to use a few external APIs that have different interfaces.
- **Facade**: Provides a simplified interface to a complex subsystem. It's commonly used to create a simple interface for a complex set of classes or a complex library.

**Behavioral Patterns**:

- **Observer**: Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. It's widely used in implementing distributed event-handling systems.
- **Strategy**: Defines a family of algorithms, encapsulates each one and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it. This is useful for scenarios where you need to dynamically change an object's behavior.

You can test your general understanding in the following scenarios:

**Scenario 1: Logging System**

You are developing a back-end system in Node.js, and you need to implement a logging system. The system should be flexible enough to log messages to various outputs (console, files, or even remote servers) without changing the core logic of your application. The logging mechanism's output destination might change based on the environment (development, testing, production).

<details>
<summary>Solution</summary>

**Pattern**: Strategy

The Strategy pattern is perfect for this scenario because it allows you to define a family of algorithms (in this case, different logging strategies) and encapsulate each one, making them interchangeable. This way, the logging mechanism can vary independently from the parts of your application that use it.

**Example Code**:

```ts
class Logger {
  constructor(strategy) {
    this.loggingStrategy = strategy
  }

  log(message) {
    this.loggingStrategy.log(message)
  }
}

class ConsoleLogger {
  log(message) {
    console.log(message)
  }
}

class FileLogger {
  log(message) {
    // Logic to log message to a file
  }
}

// Usage
const logger = new Logger(new ConsoleLogger())
logger.log('This is a log message')
```
</details>

**Scenario 2: Integrating Third-party Payment Services**

Your Node.js application needs to integrate with multiple third-party payment services (e.g., PayPal, Stripe). Each service has its own API for processing payments, but if you try to interact with them directly every time you need to process a payment, your code will become tightly coupled to the payment services' APIs:

```ts
// Tight coupling
class PaymentService {
  serviceType: 'paypal' | 'stripe' | 'paysera' | // ...

  // each service has its own API and their APIs
  // even have different mechanisms for processing
  // and canceling payments!
  paypalRestApiUrl: string
  stripeSocketsApiUrl: string
  payseraRpcApiUrl: string
  // ...

  processPayment(amount) {
    if (this.serviceType === 'paypal') {
      // PayPal payment logic
    } else if (this.serviceType === 'stripe') {
      // Stripe payment logic
    } else if (this.serviceType === 'paysera') {
      // Other payment logic
    } else if (...) {
      // ...
    }
  }

  cancelPayment() {
    if (this.serviceType === 'paypal') {
      // PayPal cancel payment logic
    } else if (this.serviceType === 'stripe') {
      // Stripe cancel payment logic
    }

    // ...
  }
}
```

This is quite hard to maintain and test 😟

<details>
<summary>Solution</summary>

**Pattern**: Adapter

The Adapter pattern is ideal for this scenario as it allows you to convert the interface of a class (in this case, the third-party payment service's API) into another interface that your application expects. This enables the integration of incompatible interfaces by providing a unified interface that your application can work with.

**Example Code**:

```ts
class PaymentAdapter {
  constructor(paymentService) {
    this.paymentService = paymentService
  }
  processPayment(amount) {
    this.paymentService.pay(amount)
  }
}

class PayPal {
  pay(amount) {
    // PayPal payment logic
  }
  cancel(amount) {
    // PayPal cancel payment logic
  }
}

class Stripe {
  pay(amount) {
    // Stripe payment logic
  }
  cancel(amount) {
    // Stripe cancel payment logic
  }
}

// Usage
const paypalAdapter = new PaymentAdapter(new PayPal());
paypalAdapter.processPayment(100);

const stripeAdapter = new PaymentAdapter(new Stripe());
stripeAdapter.processPayment(100);
```

</details>

**Scenario 3: User Activity Logging**

Imagine you're developing a back-end system for a web application using Node.js, and you need to log user activities, such as login, logout, and various actions within the application. The system should be extensible so that logging can be easily expanded to include more events and multiple logging mechanisms (e.g., file, database, external analytics service) without modifying the core user management code.

<details>
<summary>Solution</summary>

**Pattern**: Observer

**Example Code**:

```ts
// Observer.ts
interface Observer {
  update(subject: Subject): void
}

// Subject.ts
interface Subject {
  attach(observer: Observer): void
  detach(observer: Observer): void
  notify(): void
}

class UserActivitySubject implements Subject {
  private observers: Observer[] = []

  attach(observer: Observer): void {
    this.observers.push(observer)
  }

  detach(observer: Observer): void {
    this.observers = this.observers.filter(obs => obs !== observer)
  }

  notify(activity: string): void {
    this.observers.forEach(observer => observer.update(activity))
  }
}

// ConcreteObservers.ts
class Logger implements Observer {
  update(activity: string): void {
    // log the activity to a file
  }
}

class AnalyticsService implements Observer {
  update(activity: string): void {
    // send the activity data to an analytics service
  }
}

// Usage.ts
const userActivity = new UserActivitySubject()

const fileLogger = new Logger()
const analytics = new AnalyticsService()
// We can add more observers here and we would not need
// to change anything that is reporting any activities.

userActivity.attach(fileLogger)
userActivity.attach(analytics)

userActivity.notify('Logged In')
userActivity.notify('Visited Profile Page')
```
</details>

# Directions for further research (1 hour+)

- The Observer pattern and the Publish/Subscribe pattern are often mentioned together, but they are not the same. Can you explain the differences between them and provide use cases where one might be more appropriate than the other in a JavaScript application?
- OOP and FP are often viewed as opposing paradigms. How can you leverage the strengths of both paradigms in a single project?
- We've presented several typical scenarios where functional programming (FP) or object-oriented programming (OOP) patterns might be useful. Nonetheless, we urge you to delve deeper into either of these paradigms independently for a more comprehensive understanding.
