## Exercise 1

While our current solution of sending emails is perfectly fine, we will
use it as a base to introduce a few more ways of expressing the same
functionality.

One way is called currying, named after Haskell Curry.

Currying is a process of converting a function that takes multiple arguments
into a series of functions that take one argument each. This can make it quite
convenient to build up functions from smaller parts.

For example, if we had a `greet` function that takes two arguments:

```ts
const greet = (greeting: string, name: string) => `${greeting}, ${name}!`
```

We can convert it to a curried version:

```ts
const greet = (greeting: string) => (name: string) => `${greeting}, ${name}!`
```

Now calling `greet` function with `greeting` will return a function that takes
`name` and returns the final result.

```ts
const greetHello = greet('Hello')
const greetHi = greet('Hi')
greetHello('Alan') // 'Hello, Alan!'
greetHi('Alan') // 'Hi, Alan!'
```

**Task**.

1. Right now, our sendUserEmail is a non-curried function of type:
   (FormUserMessage, User) => Email.
   Write it as a curried function, of type:
   FormUserMessage => User => Email
2. Express sendSignupEmail, sendResetPasswordEmail and sendPasswordChangedEmail
   through sendUserEmail by calling it with its first argument.

## Exercise 2

Another method for providing some arguments to a function is partial application.
It can be considered a more general concept than currying, as it can be used
for any number of arguments.

"Applying" a function simply means calling it. Nothing more, nothing less.
In fact, all JS functions have a method called "apply" that does just that.

```ts
const sum = (a: number, b: number) => a + b
sum(1, 2) // 3
sum.apply(null, [1, 2]) // 3
```

First argument is to provide the "this" context, which is generally not used
in functional programming as it can reference different things.

Partial application means providing some of the arguments to a function and
getting a back function that takes the remaining arguments.

To do that, we can use Function's "bind" method.

```ts
const greet = (greeting: string, name: string) => `${greeting}, ${name}!`
```

greetHello and greetHi are partially applied functions that provide the
`greeting` argument. They are now functions that take only the `name`argument.
Also, they have the right TypeScript type!

```ts
const greetHello = greet.bind(null, 'Hello')
const greetHi = greet.bind(null, 'Hi')

greetHello('Alan') // 'Hello, Alan!'
greetHi('Alan') // 'Hi, Alan!'
```

**Task.** Express sendSignupEmail, sendResetPasswordEmail and
sendPasswordChangedEmail as partially applied sendUserEmail functions.
