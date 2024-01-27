Part 2: Interacting with the DOM and Asynchronous Programming

# Part Description

In this part, we will integrate our knowledge of HTML and JavaScript to enable dynamic interactions on websites. We will cover topics such as binding functions to HTML elements, working with the Document Object Model (DOM), event listeners and callbacks, and asynchronous programming using Promises and async functions.

# Key Learning Topics & Resources for this Part

## Binding Functions to HTML Elements (1 hour)

Begin by creating new HTML and JS files to experiment with the new material.

Next, follow along the **[CS50 Web lecture on JavaScript](https://cs50.harvard.edu/web/2020/weeks/5/) video up to 12:39**.

In the lecture, the `count` function does not have any arguments. However, we can pass arguments to it. For example, we could pass a static argument like `count(2)` and then modify the function accordingly.

```js
let counter = 0

function count(numberToAdd) {
  counter += numberToAdd // equivalent to counter = counter + numberToAdd

  // open the Console in the browser's Developer Tools to see the output
  console.log(counter)
}
```

We can also pass the `event` object to the function. This is a special object created at the moment a particular action occurs. We can pass this object to our function and then inspect it. For example:

```html
<button onclick="count(1, event)">Add 1</button>
<button onclick="count(2, event)">Add 2</button>
<button onclick="count(3, event)">Add 3</button>
```

```js
let counter = 0

function count(numberToAdd, event) {
  counter += numberToAdd
  console.log(counter)

  console.log(event) // detailed information about the event
  console.log(event.target) // which element triggered the event
}
```

Following each click, you will observe three items in the Console:

1. The counter's present value
2. The Event object, which is likely a PointerEvent (click on it to view its properties)
3. The button responsible for initiating the event. When you hover over it in the Console, it will be highlighted on the webpage.

## Interacting with DOM Elements (0.5 hour)

Continue watching the **[CS50 Web lecture on JavaScript](https://cs50.harvard.edu/web/2020/weeks/5/) from 12:39 to 26:35**.

The Document Object Model (DOM) is a programming interface for HTML documents. It represents the structure of a document as a tree of objects, where each object is a part of the document, such as an element, attribute, or piece of text.

To work with the DOM elements, you can use methods like `querySelector`, `querySelectorAll`, `getElementById`, or `getElementsByTagName`. Once you have these elements, you can add, modify, or delete their content and attributes using JavaScript.

Add a new element in your HTML file such as a `div` with an `id` attribute that you can use to identify it. Then, attempt to display the counter value in it. You can do this using the `innerText` or `innerHTML` property of the queried element. To avoid potential security issues, use `innerText` instead of `innerHTML` unless you need to insert HTML code.

## Event Listeners and Callbacks (2 hours)

Continue with the [CS50 Web lecture on JavaScript](https://cs50.harvard.edu/web/2020/weeks/5/) from 26:35 to 1:19:02. As you watch the video, try building the todo list application example alongside it.

**Note:** At 1:04:50, the video introduces `this` as a way to access the element that triggered the event. However, using `this` is not recommended, as its meaning can change depending on the context, and it wouldn't work if you used an arrow function for the event callback (such as at 1:09:00). Generally, it's best to avoid referring to `this` in your code unless absolutely necessary. Instead, use the `event` object that's automatically passed to the function handling the event. You can then use `event.currentTarget` to access the element that handled the event or `event.target` to access the element that triggered the event, which may be a child of the element handling the event. In this case, you could use:

```js
document.querySelector('select').onchange = function (event) {
  // or (event) => {
  document.querySelector('#hello').style.color = event.currentTarget.value
}
```

In the video, you learned about **callbacks** – functions passed as arguments to other functions with an intent to be called later. For instance, when we add an event listener to an element, we pass a function as an argument to the `addEventListener` function. This function is called when the event occurs. This is an example of **event-driven programming** where, instead of directly instructing the machine to do something, we provide a set of instructions executed when a specific event occurs.

```js
// 1. Example in the video, when the function is defined inline
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').onclick = count
})

// 2. An example of a callback function defined separately
function assignCountToButton() {
  document.querySelector('button').onclick = count
}

// We then pass the function as an argument to the event listener
document.addEventListener('DOMContentLoaded', assignCountToButton)

// 3. An example of setting the event listener with the addEventListener method
document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('button')

  button.addEventListener('click', count)
})
```

If you have trouble wrapping your head around callback functions, you can [watch a more in-depth video](https://www.youtube.com/watch?v=QSqc6MMS6Fk) on callback functions with some illustrative examples.

## Timers

Continue with the **[CS50 Web lecture on JavaScript](https://cs50.harvard.edu/web/2020/weeks/5/) from 1:19:02 to 1:21:04**.

Timers are useful if you want your code to run at specific intervals. There are two types of timers: `setTimeout` and `setInterval`.

`setTimeout` runs a function once after the specified delay. For example, the following code will display a message after 3 seconds:

```js
setTimeout(() => {
  console.log('Hello after 3 seconds')
}, 3000) // 3000 milliseconds = 3 seconds
```

`setInterval` repeatedly runs a function, with a time delay between each call to that function. For example, the code below will display a message every 3 seconds:

```js
setInterval(() => {
  console.log('Hello every 3 seconds')
}, 3000)
```

In practice, it is advisable to use timers cautiously, as they can sometimes result in difficult-to-track bugs and performance issues if not used properly. For example, setting an interval to update the page every 1 millisecond may cause your application to slow down and become unresponsive.

To stop a timer, utilize the `clearTimeout` and `clearInterval` functions by passing the timer ID as an argument. The timer ID is provided by the `setTimeout` and `setInterval` functions.

```js
const helloIntervalId = setInterval(() => {
  console.log('Hello every 3 seconds')
}, 3000)

// After 10 seconds, stop saying hello
// We will not clear this timeout, as it will only run once
setTimeout(() => {
  clearInterval(helloIntervalId)
}, 10000)
```

## Local Storage (0.5 hour)

Continue with the **[CS50 Web lecture on JavaScript](https://cs50.harvard.edu/web/2020/weeks/5/) from 1:21:04 to 1:29:30**.

Local storage enables data storage within a browser. It functions as a key-value store, allowing you to save data under a specific key and retrieve it later using that same key. The data remains stored in the browser even after it is closed, although users can manually clear local storage.

Keep in mind that **localStorage stores keys and values as strings**. Overlooking this detail may lead to unforeseen behavior. For example:

```js
// We want to allow user to customize their experience. We provide some buttons to change the font size and theme. To keep things tidy, we store the settings in an object. And to keep the settings between page refreshes, we store the settings in localStorage.
const settings = {
  fontSize: 14,
  theme: 'dark',
}

// We store the settings in localStorage
localStorage.setItem('settings', settings)

// Later, we retrieve the settings from localStorage
const settingsSaved = localStorage.getItem('settings')

// We received "[object Object]" instead of the object we wanted to store

// How can we store the object in localStorage?
// We have to convert it to a string that can then be converted back to an object.
// We can use JSON.stringify and JSON.parse for this.
localStorage.setItem('settings', JSON.stringify(settings))

// Later, we retrieve the settings from localStorage
const settingsSavedJson = localStorage.getItem('settings') // string '{"fontSize":14,"theme":"dark"}'
const settingsSaved = JSON.parse(settingsSavedJson) // object { fontSize: 14, theme: 'dark' }

if (settingsSaved.theme === 'dark') {
  // Add CSS class to body, which will be used to style the page through CSS
  document.body.classList.add('dark')
}

// This example is simplified; in practice, you'd need to handle errors, merge saved settings
// with default settings, and so on.
```

## Promises (0.5 - 1.5 hour)

We've already explored event-driven programming, callbacks, and timers. These concepts form the foundation of asynchronous programming, which doesn't follow a linear sequence. Instead, it delegates tasks to other programs and keeps running. Once the other program completes its task, it informs the original program and returns the result. This approach allows JavaScript to execute tasks without blocking the user interface (UI); otherwise, the browser would freeze until the task is finished. A great example - including a `while (true) {}` in your code will make the page unresponsive even to clicks.

In the callback section, we discussed how callbacks can be employed to handle asynchronous programming. However, callbacks aren't always the best solution. To simplify asynchronous programming, JavaScript uses **Promises**. A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. To learn more about Promises, watch this short video: [JavaScript Promises](https://www.youtube.com/watch?v=li7FzDHYZpc). If this still looks not very clear, we recommend watching [a longer tutorial video on Promises](https://www.youtube.com/watch?v=TnhCX0KkPqs).

## Fetch (1 hour)

In this section, we will explore how Promises function in practice. To do this, please complete the **[CS50's Web Programming Week 5 video](https://cs50.harvard.edu/web/2020/weeks/5/)** starting from 1:29:30. This part of the video will demonstrate how to make network requests using the global `fetch` function.

Practice using `fetch` to make network requests for obtaining currency exchange rates. We will expand on this concept in the following section.

**Note:** CS50 video uses Exchange Rate API which no longer is accessible without an API key. We recommend either getting an API key or using [a different public API](https://github.com/public-apis/public-apis). Make sure it has a "Yes" under the "CORS" column so it can be used inside the browser.

## Async functions (1 hour)

By the end of the CS50 JavaScript video, you should have code similar to this:

```js
// or your selected API
fetch('https://api.exchangeratesapi.io/latest?base=USD')
  .then(response => response.json())
  .then(data => {
    const currencty = document.querySelector('#currency').value.toUpperCase()
    const rate = data.rates[currency]

    // we have moved out the result element to a variable
    const result = document.querySelector('#result')

    if (rate !== undefined) {
      // we are using innerText instead of innerHTML to avoid theoretical XSS attacks
      result.innerText = `1 USD is equal to ${rate.toFixed(3)} ${currency}.`
    } else {
      result.innerText = `Invalid currency.`
    }
  })
```

To simplify working with Promises, we can utilize **async functions**. An async function is a type of function that returns a Promise as its outcome. Instead of declaring a function using the `function` keyword, we can use `async function`. This enables the `await` keyword, which allows you to wait for a Promise to resolve, enabling you to write code in a more synchronous style.

Apply your knowledge of async functions from the [Promises video](https://www.youtube.com/watch?v=li7FzDHYZpc) to modify the given code using async functions.

Allocate around 10 - 15 minutes for this task. If you get stuck, watch a more in-depth [tutorial on async functions](https://www.youtube.com/watch?v=spvYqO_Kp9Q), especially the 7:30 - 11:00 part as it covers the `fetch` example.

After you've finished, feel free to examine the solution provided below.

<details>
  <summary>Solution</summary>

```js
async function getRate() {
  const response = await fetch(
    'https://api.exchangeratesapi.io/latest?base=USD'
  )
  const data = await response.json()

  const currency = document.querySelector('#currency').value.toUpperCase()
  const rate = data.rates[currency]

  const result = document.querySelector('#result')

  const text =
    rate !== undefined
      ? `1 USD is equal to ${rate.toFixed(3)} ${currency}.`
      : `Invalid currency.`

  result.innerText = text
}
```

</details>

# Exercises (3 hours)

1. **Timers + Promises**. How can you create your own Promise? Try making an asynchronous version of `setTimeout` that pauses the execution of a function for a specified amount of time. It should work like this:

```js
console.log('Hi!')

await waitFor(1000)

// 1 second later
console.log('Oh, hi Mark!')
```

2. **HTML + CSS + JS with localStorage**. Write code that allows users to toggle the website's theme (light/dark) and save their preference in localStorage. When users return to the website, the theme should be the same as when they left it. Add a button in your HTML to change the theme and add a CSS class to the body element to change the theme.

3. **DOM manipulation + async/await + Fetch API**. Create a small web page (HTML + CSS + JS) that fetches current temperature from [a public API](https://open-meteo.com/) and displays it on the page. Use any city coordinates you desire. Use async functions and the Fetch API to handle the network request and DOM manipulation to display the data.

# Directions for further research (2 hours+):

1. Explore how to handle errors in Promise chains and async functions, including the appropriate use of `catch` and `finally`.
2. If you wanted to make two `fetch` requests simultaneously and then use the results of both requests, how would you do that?
3. What is the difference between `innerText` and `innerHTML`? What are the security implications of using one over the other?
4. What is the difference between `localStorage` and `sessionStorage`? When would you use one over the other?
5. How would you create new DOM elements using JavaScript? What would happen if you set `innerHTML` to a string containing HTML tags?
6. What is event delegation?
7. (Advanced/Optional) How could you wait for multiple async functions running concurrently (at the same time)?
