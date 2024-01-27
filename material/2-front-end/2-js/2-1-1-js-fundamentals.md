Part 1: JavaScript Fundamentals

# Part description

In this part, we will dive into JavaScript, the powerful programming language that drives interactivity and functionality on the web. We will explore syntax, variables, loops, conditionals, functions, and other core concepts of JavaScript, providing you with examples and exercises to practice and solidify your understanding. By the end of this part, you may not feel completely comfortable using JavaScript, but you should have a good understanding of how JavaScript relates to what you already know in Python.

# Key learning topics & resources for this part

## Introduction to JavaScript (1 hour)

Watch the **[CS50 JavaScript short](https://cs50.harvard.edu/college/2023/spring/shorts/javascript/)** to learn JavaScript basics. Make sure to pause the video whenever you are introduced to a new concept and you need more time to understand it. We will spend more time on core JavaScript concepts, but it is important to have a bird's eye view of the overall flow of JS code and how it generally differs from Python.

Make sure you take note of the following:
  - Syntax, when to use each bracket type: `{`, `[`, and `(`.
  - How to iterate object properties?
  - How to iterate array items?
  - What are anonymous functions?
  - How can you trigger JavaScript functions on user actions, such as a button click?

**Notes on the video:**
  - The video uses `var` in its examples, though this is no longer a recommended way to declare variables in JavaScript. In modern JS, two new keywords are used: `const` (non-reassigned) and `let` (reassigned). We will cover this in more detail later on.
  - **10:36** showcases string concatenation using the `+` symbol. Nowadays, using the new backtick syntax is a recommended option:

```js
console.log(`${wkArray[day]} is day number ${parseInt(day) + 1} of the week!`);
```

## Setup your local environment (1 - 3 hours)

If you have not already done so, now is the time to fully migrate to a local development environment.

1. We heavily recommend to start using a UNIX-based system. If you are using Linux or macOS, then you can skip this step. If you are using Windows, then we recommend to [install WSL 2 on Windows 11](https://www.youtube.com/watch?v=cJWhyycbPyA) or [on Windows 10](https://www.youtube.com/watch?v=_fntjriRe48) (up to 8:20). We recommend using the latest Ubuntu LTS version. Then, also watch the part on running [VS Code on WSL](https://youtu.be/_fntjriRe48?t=946) (starting from 15:46).
2. We recommend installing [Visual Studio Code](https://code.visualstudio.com/download) as your code editor.
3. Install **Node (LTS version)** by visiting [this link](https://nodejs.org/en/download/current/) and downloading the appropriate installer for your platform. There is also a tutorial on how to [setup Node on WSL](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl).
4. Setup `git` on your local machine similarly to how you had setup `git` on a CS50 editor virtual environment. Make sure you can access your GitHub repositories.
5. We also recommend getting the following VS Code Extensions:
  - [WSL extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl) if you're using WSL on Windows
  - [Quokka.js](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode) to explore JavaScript in an interactive way
  - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for live preview of your websites
  - [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces) to highlight trailing spaces in your code. Later on we will recommend to use sophisticated linters, but this is a good start.

## Setup a JavaScript playground (1 hour)

Before proceeding with coding, we recommend setting up a playground for running JavaScript.

1. In terminal, create a new folder called `js-playground` (or what you prefer).
2. Open up the folder in your code editor (e.g. `code .`).
3. Create a new file called `script.js` in the sidebar.
4. There are several methods for executing JavaScript code. We will focus on three approaches throughout this sprint:
  a. One way to run JavaScript code is by including your JavaScript file in an HTML file and opening it in your browser. This method is demonstrated in **[this video](https://www.youtube.com/watch?v=hdI2bqOjy3c) from 06:10 to 11:12**. The video also introduces the `console.log` function, which allows you to print out values in JavaScript.
  b. Alternatively, you can use the `node script.js` command in your terminal to execute your JavaScript file, given you have installed Node.
  c. If you are using `VS Code`, follow this brief tutorial on [how to use Quokka.js](https://www.youtube.com/watch?v=R6fZEVoN0k4). This will be the preferred method for experimenting with small JavaScript code snippets.

Now, we will try running JS files in these 3 ways.

Write the following in your `script.js` file:

```js
const sum = 5 + 9

console.log(sum)
```

Try to run the code in these 3 ways:
- Run the code in your browser (`index.html`) with `Live Server`.
- Run the code in your terminal (`node script.js`). Make sure you are in the `js-playground` folder.
- Run the code in Quokka.js (`Start on Current File`) in `VS Code`, if you are using VS Code.

If this works, let's go through more material side-by-side with your code editor open. Use any method you like to experiment with new concepts you encounter.

## Variables and Primitives (0.5 hour)

Follow along the **[Introduction to JavaScript video](https://www.youtube.com/watch?v=hdI2bqOjy3c) from 11:12 to 23:50**. Pause the video to declare variables yourself and try out string methods such as `split` and `toUpperCase`.

**Note:** We will skip `Symbol` and `BigInt` as they have more niche uses, more typical to back-end development.

Take note of the following:
  - What are the differences between `const`, `let`, and `var`?
  - How do primitives in JavaScript differ from non-primitives?
  - What is the difference between `undefined` and `null`?
  - What is the difference between `'`, `"` and \` (backtick)?
  - Does JavaScript have separate data types for integers, decimals, and floating-point numbers?
  - What is the `typeof null`?
  - Is it necessary to use semicolons in JavaScript?

**Pro tip:** Most of the time, `const` is the best choice for declaring variables. Use `let` only if you need to reassign the variable later. Avoid using `var` as it is an outdated method for declaring variables.

**Note:** While some people have strong opinions the use of semicolons, we will not treat this as a significant issue in this course. In this course, we will not require you to use or not to use semicolons. To keep matters simple, we will omit semicolons in most examples so that we can focus on practical differences between JS and Python. You can use whichever style you want but try to be consistent within a particular exercise. No matter which style you will adopt as your default, you will eventually need to understand how JavaScript treats and inserts semicolons. In practice, some large codebases use semicolons (e.g., React, Angular, jQuery, ESLint) while others do not (e.g., GitHub, Vue, Bootstrap, npm, Next.js). Here's a bonus [short video](https://www.youtube.com/watch?v=EefzIEoFX8E) on arguments for and against semicolons.

## Primitives: Exercises (1.5 hour)

[JavaScript Hero](https://www.jshero.net/en/success.html) provides some good exercises for learning the JavaScript syntax.
- (Optional) If you are struggling with understanding variable declarations, go through the first 20 exercises on the page. They are very simple and will help you get a better grasp of the syntax.
- Then, go through the exercises 20 to 50. These exercises will help you understand the different primitive types in JavaScript.

## Arrays, Objects and Functions (1 hour)

Watch the **[Introduction to JavaScript video](https://www.youtube.com/watch?v=hdI2bqOjy3c) from 23:50 to 59:20**.

Take note of the following:
  - What is object and array destructuring?
  - Can you add properties to objects declared with `const`?
  - What is the difference between JSON and JavaScript objects?
  - What are the suggested methods of iterating through arrays?
  - What is the difference between `==` and `===`?
  - What is a conditional (ternary) operator?
  - How do you provide default values to function arguments?
  - What are the differences between arrow function expressions and regular functions?

**Pro tip:** In JavaScript, functions in most cases are just like any other variable. They can be passed around, reassigned, extended with additional properties like any other object.

**Pro tip:** 99.9% of the time we recommend using `===` instead of `==` and `!==` instead of `!=`. When making an exception to this rule, add a comment explaining why as this can be considered an unintended behavior.

**Pro tip:** There are many ways to declare a function. Which should you use? A general rule of thumb is to name functions when you want to refer to them later on. If you are not going to refer to the function later on, then you can use an anonymous function, usually in the form of an arrow function expression.

## Arrays, Objects and Functions: Exercises (3 hours)

Go through the following exerciese on [JavaScript Hero](https://www.jshero.net/en/success.html):
- Exercises 51 - 68
- Exercises 71 - 76
- (Optional) Exercises 77 - 80

## Error Handling (0.5 hour)

Error handling in JavaScript is quite standard. Take a moment to watch this brief **[Error Handling in JavaScript](https://www.youtube.com/watch?v=cFTFtuEQ-10)** video.

While using your JavaScript playground, try to determine the following:
  - What occurs when you throw an error (`throw new Error('Oops!')`) within the `catch` block?
  - What transpires if you return a value in the try block and also in the `finally` block?
  - What happens if you throw an error in the `catch` block and return a value in the `finally` block?
  - Is it possible to access a variable declared in the `try` block from the `catch` or `finally` block?

**Pro tip:** When is it appropriate to handle errors with `try/catch`? Generally, you should manage errors when you can address them effectively. If you do not try/catch them, the errors will bubble up to the caller function. When there is nothing you can do about the error, then you should let it bubble up. Once it bubbles up and no one handles it, you will see an error in the console (though there are some exceptions to this). What would be a good use case of handling an error? For instance, if you are fetching data from an API, you should handle the error if you want to display an error message to the user, because your user will not know that something went wrong otherwise.

## Advanced syntax cheatsheet (1 hour)

JavaScript has a lot of additional handy syntax. It can be difficult to remember all of it, especially if you are new to the language. To help you out, here is a short cheat sheet for some JS syntax you might have not seen before. Right now, **you do not need to memorize this**. Instead, use it as a reference when you encounter these concepts in the future until you are comfortable with reading them and eventually using them yourself.

1. Logical AND operator (&&)
  - Returns the value of the second operand if the first one is truthy; otherwise, it returns the value of the first operand.
    ```js
    const areBothLoggedIn = user1.isLoggedIn && user2.isLoggedIn

    true && false // false
    true && true // true
    'hello' && 0 // 0
    0 && 'hello' // 0
    ```

2. Logical OR operator (||):
  - Returns the value of the first operand if it's truthy; otherwise, it returns the value of the second operand.

    ```js
    const hasVegetarianMeal = isVegetarian(meal1) || isVegetarian(meal2)
    ```

3. Spread operator (...) for arrays and objects:
  - Creates a shallow copy of an array/object and includes all the values/properties of the original.

  ```js
  const book = { title: 'The Catcher in the Rye', price: 20 }

  // creates a new array with all the books in the libraryOld and adds the book at the end
  const libraryOld = [ /* lots of books */ ]
  const libraryUpdated = [...libraryOld, book]

  // it is possible to add multiple books and use multiple libraries
  const libraryMerged = [
    ...libraryFiction, // first, add all the books from libraryFiction
    book, // then, add the new book
    ...libraryNonFiction, // finally, add all the books from libraryNonFiction
  ]

  // creates a new object with all the properties of book,
  // with the new price overriding the old one
  const bookDiscounted = { ...book, price: 15 }
  ```

4. Destructuring assignment.
  - Allows extracting values from arrays/objects and assigning them to variables in a concise syntax.

    ```js
    const raceResults = ['John', 'Jane', 'Mary', 'Bob']
    const [first, second, ...rest] = raceResults
    // same as:
    // const first = raceResults[0]
    // const second = raceResults[1]
    // const rest = raceResults.slice(2)
    // first = 'John', second = 'Jane', rest = ['Mary', 'Bob']

    const { password, ...userWithoutPassword } = user
    // password = 'mySecret', userWithoutPassword = { firstName: '...', ... }

    // it can provide default values
    const user = { firstName: 'John', lastName: 'Doe' }
    const { firstName, middleName = null, lastName } = user
    // creates 3 variables: firstName ('John'), middleName (null), lastName ('Doe')
    ```

5. Default function parameters:
  - Allows providing default values for function parameters if they are not provided when calling the function.

    ```js
    function calculateTotal(price, taxRate = 0.1, shippingFee = 5) {
      return price + (price * taxRate) + shippingFee
    }

    calculateTotal(50) // Returns 50 + (50 * 0.1) + 5 = 60
    ```

6. Object property shorthand:
  - A shorter way of defining object properties when the key name is the same as the value variable name.

    ```javascript
    const x = 10
    const y = 20
    const coordinates = { x, y }
    // Equivalent to: const coordinates = { x: x, y: y }
    ```

7. Ternary operator ( ? : ):
  - A shorter way of writing if/else statements. Try not to use more than one ternary operator in a single statement, as it can make the code difficult to read.

    ```js
    const result = condition ? valueIfTrue : valueIfFalse
    ```

8. (Advanced/Optional) Optional chaining (?.):
  - Allows reading the value of a property located deep within a chain of connected objects without having to check if each reference in the chain is valid.

    ```js
    const user = {
      name: 'John',

      // let's suppose the user object has an optional property 'address'
      // address: {
      //  street: 'Main Street',
      //  city: 'New York',
      // },
    }

    // this would throw an error because we are trying to access
    // a property of undefined - user.address is undefined,
    // so (undefined).city throws an error
    const city = user.address.city

    // there are multiple ways to address this issue

    // using ternary operator
    const city = user.address ? user.address : user.address.city

    // using logical AND operator
    const city = user.address && user.address.city

    // using destructuring + nullish coalescing operator
    const { city } = user.address ?? {}

    // using optional chaining - this is the shortest and most elegant solution
    const city = user.address?.city

    // Advanced use cases:
    // optional function calls
    const result = someInterface.customMethod?.()

    // optional dynamic properties
    const value= object?.[propertyName]
    ```

9. (Advanced/Optional) Nullish coalescing operator (??):
  - Returns the value of the first operand if it's not null or undefined; otherwise, it returns the value of the second operand.

    ```js
    const result = thisCouldBeNull ?? defaultValue;
    ```

## Exercise: Python to JavaScript (2 hours)

To check whether you have got a hang of JS syntax and its core features, we will do a small exercise. Your task is to rewrite Python code below to JavaScript. Use provided cheatsheet and online resources to help you with this task.

- Try using modern JavaScript features (ES6+).
- Use `camelCase` instead of `snake_case` for variable and function names.
- Prefer using 2 spaces for JS code indentation.

JavaScript provides multiple ways to solve the same problem, so do not worry if your solution is different from the provided solution. The important thing is that your code works and is readable to you. If you do not yet feel comfortable using some of the showcased language features, feel free to use the more familiar ones.

```python
# 1.
def get_full_name(first_name, last_name):
    return f"{first_name} {last_name}"
```

<details>
  <summary>Solution</summary>

  ```js
  // 1.
  function getFullName(firstName, lastName) {
    return `${firstName} ${lastName}`
  }
  ```
</details>

```python
# 2.
def wrap_in_an_object(first_name, last_name):
    return {'firstName': first_name, 'lastName': last_name}
```

<details>
  <summary>Solution</summary>

  ```js
  // 2. using regular function with a return statement
  function wrapInAnObject(firstName, lastName) {
    return { firstName, lastName }
  }

  // or you could use an arrow function with an implicit return. Take note of the parentheses around the object
  const wrapInAnObject = (firstName, lastName) => ({ firstName, lastName })
  ```
</details>

```python
# 3.
def join_arrays(array1, array2):
    return array1 + array2
```

<details>
  <summary>Solution</summary>

  ```js
  // 3.
  function joinArrays(array1, array2) {
    return [...array1, ...array2] // or array1.concat(array2)
  }
  ```
</details>

```python
# 4.
def contains_value(array, value):
    return value in array
```

<details>
  <summary>Solution</summary>

  ```js
  // 4.
  function containsValue(array, value) {
    return array.includes(value)
  }
  ```
</details>


```python
# 5.
def multiply(a, b=1):
    return a * b
```

<details>
  <summary>Solution</summary>

  ```js
  // 5.
  function multiply(a, b = 1) {
    return a * b
  }

  // or an arrow function with an implicit return
  const multiply = (a, b = 1) => a * b
  ```
</details>

```python
# 6.
def to_person_object(first_name, last_name, age):
    return {
        'firstName': first_name,
        'lastName': last_name,
        'age': age,
    }
```

<details>
  <summary>Solution</summary>

  ```js
  // 6.
  function toPersonObject(firstName, lastName, age) {
    return {
      firstName,
      lastName,
      age, // optional trailing comma
    }
  }
  ```
</details>

```python
# 7.
def create_object(key, value):
    return {key: value}
```

<details>
  <summary>Solution</summary>

  ```js
  // 7.
  function createObject(key, value) {
    return { [key]: value }
  }

  // or using an arrow function with an implicit return.
  // const createObject = (key, value) => ({ [key]: value })
  ```

</details>

```python
# 8.
def print_array_elements(array):
    for element in array:
        print(element)
```

<details>
  <summary>Solution</summary>

  ```js
  // 8.
  function printArrayElements(array) {
    for (const element of array) {
      console.log(element)
    }
  }
  ```

</details>

```python
# 9.
def print_object_properties(obj):
    for key, value in obj.items():
        print(f"{key}: {value}")
```

<details>
  <summary>Solution</summary>

  ```js
  // 9.
  function printObjectProperties(object) {
    for (const key in object) {
      console.log(`${key}: ${object[key]}`)
    }
  }
  ```
</details>

```python
# 10
class Person:
    def __init__(self, name):
        self.name = name

    def say_hello(self):
        print(f"Hello, my name is {self.name}")


person = Person('Jane')
person.say_hello()
```

<details>
  <summary>Solution</summary>

  ```js
  // 10
  class Person {
    constructor(name) {
      this.name = name
    }

    sayHello() {
      console.log(`Hello, my name is ${this.name}`)
    }
  }

  const person = new Person('Jane')
  person.sayHello()
  ```
</details>

# Directions for further research (2 hours+)

1. What would happen if you would not use any keyword for variable declaration. For example `x = 20`. Could you still access this variable?
2. What happens if you miss a semicolon? What if you add multiple semicolons?
3. Can you use _trailing commas_ in JavaScript? Should you?
4. What if you do not explicitly `return` a value from a function? What value will be returned?
5. What is a difference between value and reference in JavaScript?
6. (Optional/Advanced) What is the event loop in JS?
