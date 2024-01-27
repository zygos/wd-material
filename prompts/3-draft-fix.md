Here is the scenario for Module 2: Sprint 2:
Scenario: You were hired as a junior front-end developer at an e-commerce store. For the first few weeks, you were mainly fixing bugs in HTML and CSS. Recently, the company appointed a new team lead who is focused on code quality and keeping up with industry best practices. She reviewed the codebase and noticed several issues in the legacy code. The team lead informed you that you'll be working together to refactor the store's website by learning and applying JavaScript, DOM manipulation, Functional Programming patterns, async functions, Fetch API, localStorage and event handling. While you're still getting up to speed with JavaScript, she has given you a week to learn the essentials and then get hands-on with the project.

Here's a rough draft for a Module 2, Sprint 2, Part 3 - Interacting with the DOM and Asynchronous Programming
"""
Part 3: Interacting with the DOM and Asynchronous Programming

# Part description

In this part, we will combine what we have learned in HTML and JavaScript for dynamic website interactions. Topics covered include binding functions to HTML elements, working with the Document Object Model (DOM), event listeners and callbacks, as well as asynchronous programming using Promises and async functions.

# Key learning topics & resources for this part

## Binding functions to HTML elements (1 hour)

Start off with creating a new HTML and JS files to play around with the new material.

Then, follow along the **[CS50 Web lecture on JavaScript](https://cs50.harvard.edu/web/2020/weeks/5/) up to 12:39**.

**Note**: For the purposes of this CS50 video lecture, do not include `type="module"` in your `<script>` tag. This allows us to access the functions and variables we declared in the `<script>` tag from the HTML file and from the browser's Console. This is not the case when using `type="module"`.

**Pro tip**: If you wanted to access a variable that was declared in a `<script type="module">` tag, you would need to explicitly assign the function to the global `window` attribute to make it accessible. For example, `window.count = count`. Then, it becomes a global variable and can be accessed from the Console by typing `window.count` or just `count`.

In the video, the `count` function has no arguments. But we could pass arguments to it. We could pass a static argument such as `count(2)` and then modify our function to do something about it, for example:

```js
let counter = 0

function count(numberToAdd) {
  counter += numberToAdd // same as counter = counter + numberToAdd

  // open the Console in the browser's Developer Tools to see the output
  console.log(counter)
}
```

We can also pass the `event` object to the function. This is a special object created at the time when a particular action has occurred. We can pass this object to our function and then inspect it. For example:

```html
<!--
<button onclick="javascript that will be executed on click">Add 1</button>
-->

<button onclick="count(1, event)">Add 1</button>
<button onclick="count(2, event)">Add 2</button>
<button onclick="count(3, event)">Add 3</button>
```

```js
let counter = 0

function count(numberToAdd, event) {
  counter += numberToAdd
  console.log(counter)

  console.log(event) // information on the event
  console.log(event.target) // which element triggered the event
}
```

Now, after every click we should see three things in the Console:
- the current value of the counter
- the Event object, most likely PointerEvent (click on it to see its properties)
- the button that triggered the event. If we hover on it in the Console, it should be highlighted on the page.

## Interacting with DOM elements (0.5 hour)

Let's continue with the **[CS50 Web lecture on JavaScript](https://cs50.harvard.edu/web/2020/weeks/5/) from 12:39 to 26:35**.

The Document Object Model (DOM) is a programming interface for HTML documents. It represents the structure of a document as a tree of objects. Each object is a part of the document, such as an element, attribute, or piece of text.

To get the DOM elements you want to work with, you can use methods like `querySelector`, `querySelectorAll`, `getElementById`, or `getElementsByTagName`. Once you have these elements, you can add, modify, or delete their content and attributes with JavaScript.

Try creating a new element, for example a `div` with some `id` attribute that you can use to identify it. Then, try to display the counter value in it. You can do this by using the `innerText` or `innerHTML` property of the queried element. Unless you want to insert HTML code, it is recommended to use `innerText` to avoid any potential security issues.

## Event listeners and Callbacks (2 hours)

We will continue with the **[CS50 Web lecture on JavaScript](https://cs50.harvard.edu/web/2020/weeks/5/) from 26:35 to 1:19:02**. Make sure to follow along and try out building the todo list application example side by side with the video.

**Note:** At **1:04:50**, the video introduces `this` as a way to access the element that triggered the event. This is not recommended as `this` can have different meaning depending on the context. It would also not work if you used an arrow function for the event callback (such as in **1:09:00**). In general, we recommend not to refer to `this` in your code unless there is no other way. In this situation, there is a better way. All functions that handle events receive an `event` object as an argument. JavaScript passes this object to the function automatically, we simply need to accept it as an argument. Then, we can use `event.currentTarget` to access the element that handled the event or `event.target` to access the element that triggered the event, which may be a child of the element that handled the event. In this situation we could use:

```js
document.querySelector('select').onchange = function(event) { // or (event) => {
  document.querySelector('#hello').style.color = event.currentTarget.value
}
```

In the video, you were introduced to **callbacks** - functions that are passed as arguments to other functions. These functions are then called back at a later time. For example, when we add an event listener to an element, we pass a function as an argument to the `addEventListener` function. This function is then called back when the event occurs. This is an example of **event-driven programming** where instead of directly instructing the machine to do something, we provide it with a set of instructions that it will use when a particular event occurs.

```js
// 1. Example in the video, when the function is defined inline
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('button').onclick = count
})

// 2. An example of a callback function defined separately
function assignCountToButton() {
  document.querySelector('button').onclick = count
}

// we then pass the function as an argument to the event listener
document.addEventListener('DOMContentLoaded', assignCountToButton)

// 3. An example of setting the event listener with the addEventListener method
document.addEventListener('DOMContentLoaded', function() {
  const button = document.querySelector('button')

  button.addEventListener('click', count)

  // or if we chain the methods
  document.querySelector('button').addEventListener('click', count)
})
```

This is yet another example of **higher-order functions** - functions that take other functions as arguments.

Event listeners are another way to react to events in your application. Instead of using event attributes like `onclick`, event listeners allow you to separate your JavaScript logic from the HTML markup.

To learn about event listeners, watch this **[YouTube video](...)** that explains how to use event listeners to detect user actions and respond accordingly.

This involves adding event listeners to DOM elements and passing in a function (called callback) that executes when the event occurs. To practice, follow along with the video and create some event listeners for your buttons created in the "Binding functions to HTML elements" section.

**Pro-tip**: Avoid attaching event listeners within loops (like `forEach`) if you can prevent it. These can cause performance issues for a large number of elements. Instead, use event delegation to assign the event listener to a common parent element. This can help optimize your application's performance.

## Timers

Continue with the **[CS50 Web lecture on JavaScript](https://cs50.harvard.edu/web/2020/weeks/5/) from 1:19:02 to 1:21:04**.

If we want our code to run at a specific time, we can use timers. There are two types of timers: `setTimeout` and `setInterval`.

`setTimeout` runs a function once after the specified delay. For example, the following code will display a message after 3 seconds:

```js
setTimeout(function() {
  console.log('Hello after 3 seconds')
}, 3000)
```

`setInterval` runs a function repeatedly, with the time delay between each call to that function. For example, the following code will display a message every 3 seconds:

```js
setInterval(function() {
  console.log('Hello every 3 seconds')
}, 3000) // 3000 milliseconds = 3 seconds
```

In practice, it is best to use these timers with caution. They can be useful for some situations, but they can also be a a source of hard-to-track bugs and performance issues when used incorrectly. For example, if you use `setInterval` to update the page every 1 millisecond, your application will likely slow down and become unresponsive.

What should you do if you want to stop a timer? You can use two special methods - `clearTimeout` and `clearInterval` functions to stop a timer. These functions take the timer ID as an argument. The timer ID is returned by the `setTimeout` and `setInterval` functions.

```js
const helloIntervalId = setInterval(function() {
  console.log('Hello every 3 seconds')
}, 3000)

// after 10 seconds, stop saying hello
// we will not clear this timeout as it will only run once
setTimeout(function() {
  clearInterval(helloIntervalId)
}, 10000)
```

## Local Storage (0.5 hour)

Continue with the **[CS50 Web lecture on JavaScript](https://cs50.harvard.edu/web/2020/weeks/5/) from 1:21:04 to 1:29:30**.

Local storage is a way to store data in the browser. It is a key-value store, which means that you can store data under a specific key and retrieve it later using the same key. The data is stored in the browser and persists even after the browser is closed. Though, user can clear the local storage manually.

It is important to note that **localStorage stores keys and values as strings**. Forgetting this fact could result in unexpected behavior. For example:

```js
// We want to allow user to customize their experience. We provide some buttons to change the font size and theme. To keep things tidy we store the settings in an object. And to keep the settings between page refreshes we store the settings in localStorage.
const settings = {
  fontSize: 14,
  theme: 'dark',
}

// We store the settings in localStorage
localStorage.setItem('settings', settings)

// Later, we retrieve the settings from localStorage
const settingsSaved = localStorage.getItem('settings')

// we received "[object Object]" instead of the object we wanted to store

// How can we store the object in localStorage?
// We have to convert it to a string that can then be converted back to an object.
// We can use JSON.stringify and JSON.parse for this.
localStorage.setItem('settings', JSON.stringify(settings))

// Later, we retrieve the settings from localStorage
const settingsSavedJson = localStorage.getItem('settings') // string '{"fontSize":14,"theme":"dark"}'
const settingsSaved = JSON.parse(settingsSavedJson) // object { fontSize: 14, theme: 'dark' }

if (settingsSaved.theme === 'dark') {
  // add css class to body which will be used to style the page through CSS
  document.body.classList.add('dark')
}

// this example is a bit simplified, as we would need to handle errors, merge stored settings with the default settings, etc.
```

## Promises (0.5 hour)

We have familiarized ourselves with event-driven programming, callbacks, and timers. These are the building blocks of asynchronous programming. That is, programming that does not run in a linear fashion. Instead, it hands off tasks to other programs and continues to run. When the other program finishes its task, it notifies the original program and passes the result back to it. That is how JavaScript manages to perform tasks without blocking the UI. Otherwise, the browser would freeze until the task is completed.

In the callback section, we saw how callbacks can be used to handle asynchronous programming. However, callbacks are not an ideal solution in many cases. To make asynchronous programming easier, JavaScript utilizes **Promises**. A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation. To learn more about Promises, [watch this short video](https://www.youtube.com/watch?v=li7FzDHYZpc).

## Fetch API (1 hour)

Now we will see how Promises work in action. Let's finish the **[CS50's Web Programming Week 5 video](...) starting from 1:29:30**. This section will cover how to make network requests using the Fetch API.

Try out using the Fetch API for making network requests. We will build on this in the next section.

## Async functions (1 hour)

By the end of the CS50 JavaScript video, you should have code similar to this:

```js
fetch('https://api.exchangeratesapi.io/latest?base=USD')
  .then(response => response.json())
  .then(data => {
    const currencty = document.querySelector('#currency').value.toUpperCase();
    const rate = data.rates[currency];

    // we have moved out the result element to a variable
    const result = document.querySelector('#result');

    if (rate !== undefined) {
      // we are using innerText instead of innerHTML to avoid theoretical XSS attacks
      result.innerText = `1 USD is equal to ${rate.toFixed(3)} ${currency}.`;
    } else {
      result.innerText = `Invalid currency.`;
    }
  });
```

To make working with Promises easier, we can use **async functions**. An async function is a function that returns a Promise as a result. Instead of declaring a function as `function`, we instead can use `async function`. This unlocks the `await` keyword, which can be used to wait for a Promise to resolve so it can be written in a more synchronous style.

Use what you have learned about async functions from the [Promises video](https://www.youtube.com/watch?v=li7FzDHYZpc) to rewrite the above code using async functions.

Spend ~10 - 20 minutes on this. If you get stuck, you can inspect the solution below.

<details>
  <summary>Solution</summary>

  ```js
  async function getRate() {
    const response = await fetch('https://api.exchangeratesapi.io/latest?base=USD');
    const data = await response.json();

    const currency = document.querySelector('#currency').value.toUpperCase();
    const rate = data.rates[currency];

    const result = document.querySelector('#result');

    if (rate !== undefined) {
      result.innerText = `1 USD is equal to ${rate.toFixed(3)} ${currency}.`;
    } else {
      result.innerText = `Invalid currency.`;
    }
  }
  ```
</details>

# Exercises (3 hours)

1. **Timers + Promises**. How could you create your own Promise? Try to make an asyncronous version of `setTimeout` which pauses the execution of a function for a specified amount of time. It should work like this:

```js
console.log('Hi!');

await setTimeoutFor(1000);

// 1 second later
console.log('Oh, hi Mark!');
```

2. **HTML + CSS + JS with localStorage**. Write code that allows your user to toggle the website's theme (light / dark) and save the user's preference in localStorage. When the user returns to the website, the theme should be the same as when they left it. Add a button in your HTML to change the theme and add a CSS class to the body element to change the theme.

3. **DOM manipulation + async/await + Fetch API**. {{ add an exercise }}

# Directions for further research (1 hour+):

{{ add various questions to research to fill in the gaps }}
"""

Students are already familiar with HTML, CSS, Python and JavaScript syntax.

Update and expand the given draft:
- apply the rough instructions provided in the curly brackets for the updates.
- fix any structural or grammatical issues
- expand it into a full sprint part guide (1000 - 3000 words). You can add additional resources, topics and so on
- if you do not know the link to a resource, just use an ellipsis (...) instead of a link.
- provide pro tips and insights
- encourage to use good practices