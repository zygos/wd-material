Part 3: Working with Arrays and Objects

## Part Description

In this part, we will learn some common JavaScript patterns. Topics covered include breaking down problems into smaller steps, writing small functions, utilizing higher-order functions like `map` and `filter`. After that we will touch on how to handle growing files, and how to split code in a modular fashion with imports and exports.

## Key Learning Topics & Resources

### Using loops (0.5 hour)

We will go through multiple problems that will require incorporating some new concepts.

Here is the **first problem**:

In this task, you will be implementing a function called **hasDiscounted** that will receive two arrays, `discounted` and `cart`. The `discounted` array will contain a list of products that are currently on discount, while the `cart` array will contain the list of products that the user has added to their shopping cart.

The goal of this task is to determine whether any product from the `discounted` list is present in the user's shopping cart. If there is at least one discounted product, the function should return `true`. Otherwise, it should return `false`. Refer to the code snippet provided for an example implementation.

Data examples:

```js
const discounted = [
  { productId: 12, label: 'Smartphone' },
  { productId: 67, label: 'Tablet' },
]

const cart = [
  { productId: 12, label: 'Smartphone' },
  { productId: 43, label: 'Laptop' },
  { productId: 67, label: 'Tablet' },
]
```

How would you solve this problem? Spend 10 - 20 minutes on writing a possible solution using a `for` loop(s).

Once you are ready, compare your solution with the one provided below.

<details>
  <summary>Solution</summary>

  ```js
  function hasDiscounted(discounted, cart) {
    for (let i = 0; i < discounted.length; i++) {
      const discountedProduct = discounted[i]

      for (let j = 0; j < cart.length; j++) {
        const cartProduct = cart[j]

        if (discountedProduct.productId === cartProduct.productId) {
          // found a discounted product
          return true
        }
      }
    }

    // nothing found
    return false
  }
  ```
</details>

### Higher Order Functions (1 hour)

While this solution works, it is not very readable. `for` loops do not express the intent of the code very well. It is not clear what we are trying to achieve. We are just iterating through two arrays and comparing their elements.

Let's try to solve this problem using a different approach that more clearly expresses our intent. Before we proceed any further, let's watch the video on **[Higher Order Functions in JavaScript](https://www.youtube.com/watch?v=0aKZvNNf8BA)**. You should be already somewhat familiar with the idea of higher-order functions from Python, usually in the form of lambda functions. But this idea is even more prevalent in JavaScript.

After you've finished the video, spend 10 minutes on writing a solution to the previous problem using the `filter` function from the video.

### Array methods (1 hour)

In the video, you were introduced to the `filter` function. It can be used to solve our previous problem. Here is an example implementation:

```js
function hasDiscounted(discounted, cart) {
  const discountedInCart = cart.filter(product => {
    const productsMatching = discounted
      .filter(productDiscounted => product.productId === productDiscounted.productId)

    // or productsMatching.length !== 0,
    // or even `productsMatching.length` as `0` will be converted to a boolean `false`
    return productsMatching.length > 0
  })

  return discountedInCart.length > 0
}
```

This solution does not involve any `for` loops, thus sparing us from the need to manage the loop counters and indexes.

Though, it has a few issues. First, it requires iterating through all items even if we find a match early on. Second, it creates a new array for each product in the `discounted` array. This is not very efficient.

These are common low-level issues that JavaScript addresses with specialized array methods. You can find a list of all array methods in [MDN Array reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Right now, take a look at the [`some` and `every` methods](https://www.youtube.com/watch?v=ZCxsknqbuwU).

Using the `some` method, rewrite the `hasDiscounted` function. Spend around 10 minutes on this task.

After you've finished, compare your solution with the one provided below.

<details>
  <summary>Solution</summary>

  ```js
  function hasDiscounted(discounted, cart) {
    return discounted.some((discountedProduct) => {
      const hasProduct = cart
        .some(product => discountedProduct.productId === product.productId)

      return hasProduct
    })
  }

  // or if you want to make it even shorter by removing the curly braces and return statement
  function hasDiscounted(discounted, cart) {
    return discounted
      .some(({ productId }) => cart
        .some(product => productId === product.productId))
  }

  // if you want to be even more concise
  const hasDiscounted = (discounted, cart) =>
    discounted.some(({ productId }) => cart.some(product => productId === product.productId))
  ```
</details>

### Array methods: Documentation (1.5 hour)

Skim through the following Array methods in [MDN Array reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array):

Checking/searching by conditions:
- `every`
- `some`
- `filter`
- `find`
- `findIndex`

Searching for an element:
- `includes`
- `indexOf`

Getting a part of an array:
- `slice`

Adding/removing elements (changes the provided array):
- `push`
- `pop`

Transforming elements:
- `map`
- `flatMap` (advanced)

Sorting elements:
- `sort` (and `toSorted`)
- `reverse` (and `toReversed`)

Converting to a string:
- `join`

General purpose iteration:
- `forEach`
- `reduce` (this one is a bit tricky, so don't worry if you don't understand it right away)

You will need to use some of these methods in the upcoming tasks, so keep the documentation open!

### Method chaining (0.5 hour)

What if we wanted to perform multiple operations on an array? For example, we want to filter out some elements, then sort the remaining elements, and then get the first 5 elements.

We could do this by creating a new variable for each operation:

```js
const filtered = cart.filter(product => product.price > 100)
const sorted = filtered.sort((a, b) => b.price - a.price)
const firstFive = sorted.slice(0, 5)
```

This works and this is a perfectly valid solution. But in practice, we will often encounter situations where we do not need to keep the intermediate results. We just want to get the final result.

In this case, we can use **method chaining**. It allows us to call multiple methods on the value returned from the previous method call.

Here is how we can rewrite the previous example using method chaining:

```js
const fiveMostExpensive = cart
  .filter(product => product.price > 100) // we then feed the result to the next method
  .sort((a, b) => b.price - a.price) // sort by price, descending (from the most expensive to the least expensive)
  .slice(0, 5) // first 5
```

Other data types have their own methods. For example, strings:

```js
const formatted = '  Hello, world!  '
  .trim() // 'Hello, world!'
  .toLowerCase() // 'hello, world!'
  .replace('hello', 'hi') // 'hi, world!'
```

Finally, we can mix methods from different data types:

```js
const formatted = '  Hello, world!  '
  .trim() // 'Hello, world!'
  .toLowerCase()  // 'hello, world!'
  .replace('hello', 'hi') // 'hi, world!'
  .split(' ') // ['hi,', 'world!']
  .map(word => word[0].toUpperCase() + word.slice(1)) // ['Hi,', 'World!']
  .join(' ') // 'Hi, World!'
```

Though, at some point it might become hard to follow so we can create intermediate variables:

```js
const formatted = '  Hello, world!  '
  .trim()
  .toLowerCase()
  .replace('hello', 'hi')

const words = formatted.split(' ')

const capitalized = words
  .map(word => word[0].toUpperCase() + word.slice(1))
  .join(' ') // 'Hi, World!'
```

### Exercise: Method chaining (1 hour)

You are working on an ecommerce site and you have noticed that a lot of product descriptions are poorly formatted. They contain a lot of unnecessary whitespace and line breaks. You would like to fix this.

In this task, you will be implementing a function called `formatDescription` that will receive a string.

The goal of this task is to format the string, removing the unnecessary whitespace and multiple line breaks.

`description` string example:
```
 Sleek, modern design.

  Ultra-high resolution display.  
 

  Latest-gen performance. 

Amazing battery life. 
```

Expected result:
```
Sleek, modern design.
Ultra-high resolution display.
Latest-gen performance.
Amazing battery life.
```

**Note:** Do not use regular expressions, as these are quite hard to read. You can use the `\n` character to split lines. Also, you can use the `trim` method to remove whitespace from the beginning and end of a string.

How would you solve this problem? Spend 30 minutes on writing a possible solution. You might need to use some `join` and `split` array methods.

If you do not know where to start, try to break down the problem into smaller steps. For example, you can start by splitting the string into an array of lines. Then, you can process each line individually. Finally, you can join the lines back together.

If you are still stuck, look at the solution template below.

<details>
  <summary>Solution template</summary>

  ```js
  /* Fill in "..." with your code */
  function formatDescription(description) {
    return description // String
      .split('\n') // split into lines (String -> Array)
      .map(line => ...) // trim every line (Array -> Array)
      .filter(line => ...) // remove empty lines (Array -> Array)
      .join(...) // join lines back together (Array -> String)
  }
  ```
</details>

Once you are ready, compare your solution with the one provided below:

<details>
  <summary>Solution</summary>

  ```js
  function formatDescription(description) {
    return description // 'Sleek, modern design.\n\nUltra-high resolution display.\n...'
      .split('\n') // [' Sleek, modern design.', '', '  Ultra-high resolution display.  ', ...]
      .map(line => line.trim()) // ['Sleek, modern design.', '', 'Ultra-high resolution display.', ...]
      .filter(line => line.length > 0) // ['Sleek, modern design.', 'Ultra-high resolution display.', ...]
      .join('\n') // // 'Sleek, modern design.\nUltra-high resolution display.\n...'
  }
  ```
</details>

As you can see, we are using multiple string and array methods to solve this problem. Method chaining is a very common pattern in JavaScript. It allows us to write concise code that slowly approaches the desired result.

### Sorting (1 hour)

You also have noticed that if a user has a lot of products in their shopping cart and then they open up the cart popup, they are blasted with an entire list of products. Let's display only the few most expensive products.

Write a function that returns 3 most expensive products in their cart.

Example of unsorted products:

```js
const cart = [
  { productId: 39, price: 15 },
  { productId: 12, price: 600 },
  { productId: 83, price: 920 },
  { productId: 43, price: 1200 },
  { productId: 67, price: 80 },
  { productId: 105, price: 700 },
]
```

Expected result:
```js
const cartTrimmed = {
  { productId: 43, price: 1200 },
  { productId: 83, price: 920 },
  { productId: 105, price: 700 },
}
```

Spend 10 - 20 minutes on writing a possible solution before looking at the provided solution. Could you make it so your solution does not change the original array?

<details>
  <summary>Solution</summary>

  ```js
  function trimCart(cart) {
    return cart
      .sort((a, b) => b.price - a.price)
      .slice(0, 3)
  }

  // to not change the original array, we can use a "spread" operator
  function trimCart(cart) {
    return [...cart]
      .sort((a, b) => b.price - a.price)
      .slice(0, 3)
  }

  // or ideally, if your environment (Node 20+ and latest browsers) supports it, you can use the "toSorted" method
  function trimCart(cart) {
    return cart
      .toSorted((a, b) => b.price - a.price)
      .slice(0, 3)
  }
  ```
</details>

### Iterating and accumulating (0.5 hour)

While displaying only the most expensive products is a good start, it would be best to display the price of all remaining products. Let's add a function that calculates the price of all remaining products that are not within the top 3 most expensive products. Return `0` if there are 3 or fewer products in the cart.

```js
const cart = [
  { productId: 39, price: 15 },
  { productId: 12, price: 600 },
  { productId: 83, price: 920 },
  { productId: 43, price: 1200 },
  { productId: 67, price: 80 },
  { productId: 105, price: 700 },
]
```

Expected result:
```js
const priceRemaining = 1395 // 15 + 600 + 80 + 700
```

Spend 5 - 10 minutes on writing a possible solution before looking at the provided solution. It could be useful to look up the `reduce` method.

<details>
  <summary>Solution</summary>

  ```js
  function getPriceRemaining(cart) {
    return cart
      .toSorted((a, b) => b.price - a.price)
      .slice(3)
      .reduce((total, product) => total + product.price, 0)
  }
  ```
</details>

**Pro tip:** `reduce` is very powerful, but due to it being a very general method, it can be hard to understand what it does. In general, it should be used sparingly for very simple operations, such as summing up numbers.

### Refactoring

Could you refactor the code from the previous two tasks to extract out the common logic into a separate function? Spend 5 - 15 minutes on writing a possible solution before looking at the provided solution.

<details>
  <summary>Solution</summary>

  ```js
  function trimCart(cart) {
    return sortMostExpensive(cart)
      .slice(0, 3)
  }

  function getPriceRemaining(cart) {
    return sortMostExpensive(cart)
      .slice(3)
      .reduce((total, product) => total + product.price, 0)
  }

  function sortMostExpensive(cart) {
    return cart
      .toSorted((a, b) => b.price - a.price)
  }
  ```
</details>

### Static methods (0.5 hour)

JavaScript also has some built-in methods that are not attached to any object instance. These are called static methods. For example, `Math.max` is a static method that returns the largest of the given parameters.

```js
Math.max(1, 2, 3) // 3
```

There are also static methods for arrays, such as:
- `Array.isArray(value)` - true if value is an array, false otherwise
- `Object.keys(object)` - { key1: value1, key2: value2 } -> [key1, key2]
- `Object.values(object)` - { key1: value1, key2: value2 } -> [value1, value2]

Advanced:
- `Object.entries(object)` - { key1: value1, key2: value2 } -> [[key1, value1], [key2, value2]]
- `Object.fromEntries(array)` - [[key1, value1], [key2, value2]] -> { key1: value1, key2: value2 }

## Exercise: Iterating through Objects (2 hours)

To practice all the concepts we have learned today, let's write a function that deals with strings, arrays and objects.

Write a function that accepts a string as an argument and returns the most frequent word. Requirements:
- If a string is not provided, throw a TypeError error asking for string.
- If the string contains no words, return null.
- Ignore numbers, all non-latin characters and the following words: 'the', 'an', 'a', 'of', 'and', 'or', 'but'.
- Treat every word as lowercase (so "Word" = "word").
- If there is a tie, return the word that appears first in the string.

Example:
```js
const text = ' The quick brown fox jumped over the lazy Dog. The dog, seeing the Fox jump,jumped over the Moon. The Moon was big and blue. '

getMostFrequentWord(text) // 'fox'
```

Spend at least 30 minutes on writing a possible solution before looking at the provided solution.

**Hint**: You might need to use regular expressions to remove non-latin characters and multiple white space characters.

**Hint**: Using an object (or Map) to store the word count might be helpful.

<details>
  <summary>Solution</summary>

  ```js
  // Set is also an option
  const wordsIgnored = ['the', 'an', 'a', 'of', 'and', 'or', 'but']

  // Solution
  function mostFrequentWord(string) {
    if (typeof string !== 'string') {
      throw new TypeError('Input must be a string')
    }

    const words = string
      .toLowerCase()
      .replace(/[^a-z\s]/g, ' ')
      .trim()
      .replace(/\s{2,}/g, '')
      .split(' ')
      .filter(word => !wordsIgnored.includes(word))

    // Map is also an option
    const wordCounts = {}

    // forEach, reduce are possible alternatives
    for (const word of words) {
      // using ternary operator instead of an if statement
      wordCounts[word] = wordCounts[word]
        ? wordCounts[word] + 1
        : 1
    }

    let maxCount = 0
    let maxWord = ''

    for (const word in wordCounts) {
      if (wordCounts[word] > maxCount) {
        maxCount = wordCounts[word]
        maxWord = word
      }
    }

    // we could also use ||, ?? or ternary operator instead
    if (maxWord === '') return null

    // an alternative solution would be to use Math.max(...Object.values(wordCount)) and
    // then words.find to find the key that corresponds to the max value
    return maxWord
  }
  ```
</details>

## Importing and Exporting (0.5 hours)

As our JS codebase grows, we will need to split our code into multiple files. This will help us keep our code organized and maintainable. We will split the functions we wrote today into 2 files: `product.js` (containing `formatDescription`) and `cart.js` (containing everything else). Then, we will import the functions into our `index.js` file.

JavaScript has multiple ways to handle importing and exporting code. We will be using the ES6 module syntax, which is the most modern and widely used way of importing and exporting code.

To get an understanding of how it works, watch a video on [JavaScript Modules](https://www.youtube.com/watch?v=s9kNndJLOjg).

1. Create 3 new files: `product.js`, `cart.js` and `index.js`.
2. Move the `formatDescription` function into `product.js`.
3. Move the rest of the functions into `cart.js`.
4. In each file, add `export` before each function declaration.
5. In your `index.js` file, add `import` statements to import all functions from `product.js` and `cart.js`.
6. Make sure that your code still works when called from `index.js`.

Bonus: If you have refactored your code to extract out `sortMostExpensive` into a separate function, you should not need to export it. The "parent" file that imports `cart.js` should be indifferent to how `cart.js` is implemented and whether it uses `sortMostExpensive` or not.

**Note.** Once you start working with multiple files, Quokka will not be able to run your code. You will need to run your code using your browser or Node.js. Quokka will still be able to run your code if you are not importing any internal files.

**Note.** Due to legacy reasons Node.js does not have ES6 modules enabled by default. To fix that:
1. Run `npm init -y` in your playground folder
2. Wait a few seconds for it to generate the `package.json` file.
3. Add `"type": "module"` in the `package.json` file. Do not forget to add a comma!

**Pro tip.**: Variables and functions declared with a `<script type="module">` will not be accessible from the HTML. If you want to access a particular value from the HTML document, you will need to assign it to the global `window` attribute to make it accessible. For example, if we have a function `count`, we would need to add `window.count = count` in the module. Then, the function can be accessed from the Console by typing `window.count` or simply `count`.

# Directions for further research (2 hours+)

1. Node.js by default uses CommonJS exports and imports. Read about the differences between CommonJS and ES6 modules.
2. Some JS functions modify the original value, while others return a new value which can be changed independently. For example, `Array.prototype.sort` modifies the original array, while `Array.prototype.slice` returns a new array. Read about the differences between mutating and non-mutating functions. Which should we prefer and why?
3. Is it possible to map or filter object by keys or values? If not, why? If yes, how?
4. What happens if you use a new JavaScript feature, ship it to a working website and the user is running a browser that does not support that feature? How could you address this issue?
5. What is the role of `npm` in Node applications? How does it compares to Python's `pip` and virtual environments?
6. (Optional/Advanced) What are JavaScript closures?
