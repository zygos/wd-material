Part 3: Object-Oriented and Functional Programming patterns in JavaScript

# Part introduction

{{ TODO: add intro }}

# Key learning topics & resources for this part

## OOP programming patterns (3 hours)

- Watch: [10 Design Patterns Explained](https://www.youtube.com/watch?v=tv-_1er1mWI) (15 minutes)
- Read: [Design patterns in TypeScript](https://refactoring.guru/design-patterns/typescript) (3 hours)

The Design patterns page contains a lot of information, so we recommend to focus on the following patterns:

**Creational Patterns**:

- **Singleton**: Ensures a class has only one instance and provides a global point of access to it. It's widely used for managing shared resources, such as database connections or configurations.
- **Factory Method**: Defines an interface for creating an object, but lets subclasses alter the type of objects that will be created. It's useful when a class cannot anticipate the class of objects it needs to create.
- **Abstract Factory**: Provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's often used in applications that need to be extensible and work with families of related products.

**Structural Patterns**:

- **Adapter**: Allows incompatible interfaces to work together. This is useful when you need to integrate new features or components with existing code that cannot be modified.
- **Facade**: Provides a simplified interface to a complex subsystem. It's commonly used to create a simple interface for a complex set of classes or a complex library.
- **Decorator**: Adds new functionality to an object without altering its structure. This pattern is particularly useful for adding features to a class dynamically.

**Behavioral Patterns**:

- **Observer**: Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. It's widely used in implementing distributed event handling systems, such as model-view-controller (MVC) architectures.
- **Strategy**: Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it. This is useful for scenarios where you need to dynamically change the behavior of an object.
- **Command**: Encapsulates a request as an object, thereby allowing for parameterization of clients with queues, requests, and operations. It's useful for implementing things like undo/redo functionality, transactional behavior, and callback functionality.

## OOP programming patterns exercises (2 hours)

{{ TODO: add exercises }}

## Functional programming patterns (3 hours)

- Read: [First 6 chapters of Mostly adequate guide to FP](https://mostly-adequate.gitbook.io/mostly-adequate-guide/) (3 hours)

In contrast to OOP, functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data. It's a declarative programming paradigm, which means programming is done with expressions or declarations instead of statements.

Given that you are dealing with functions every day, you might have already considered yourself familiar with functional programming (FP). However, this is quite far from the truth.

```js
// Just as this is not OOP
const object = {}

// So is this not FP
function doSomething() {}
```

A more appropriate example of FP would be:

```js
applySpec({
  amountTotal: sumAmountPaid,
  amountPaid: pipe(
    filter(propNeq('paidAt', null)),
    sumAmountPaid,
  ),
  paymentCount: length,
}),
```

{{ TODO: pasiūlyti pasigilinti į vieną - du jiems įdomiausius concepts }}

## Functional programming exercises (2 hours)

- Exercises: [Mostly Adequate Guide exercises](https://github.com/MostlyAdequate/mostly-adequate-guide) (2 hours)

{{ TODO: check if 2 hours is sufficient to get a taste and understanding of FP in JS }}

# Directions for further research (1 hour+)

- {{ TODO: add }}
