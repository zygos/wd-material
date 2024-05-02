Part 1: TypeScript Fundamentals

# Sprint Description

As you've worked through the material so far, you've acquired an understanding of the core essentials of front-end development: HTML, CSS, JavaScript, and a front-end framework that helped you to integrate all three into a modular application. This sprint aims to deepen and refine your front-end skill set by introducing you to the last few pieces of the puzzle in the front end.

In the first part of this sprint, you'll be introduced to TypeScript, a typed superset of JavaScript that adds compile-time type-checking. TypeScript promotes self-documenting code and catching errors before they occur - a powerful tool in any developer's toolkit. You can adopt TypeScript incrementally - you do not have to jump into the strictest configuration.

Next, we turn our attention to the world of testing. You'll first explore unit testing, which involves breaking down the application into isolated pieces and verifying that each works as expected. This will allow us to practice higher-order functions, async/await, and types. Then, you'll learn about end-to-end (E2E) testing, which tests your application from the user's perspective.

In the final part, you will build on your previous habit-tracking application by adding tests and TypeScript and improving your project based on the feedback you received during reviews.

We're excited to see what you'll accomplish by the end of this sprint!

# Part Description

In this part, we will introduce static typing using **TypeScript**. We will start by understanding the motivations behind using TypeScript, diving into its syntax and core concepts, setting it up in our code editor, and, finally, learning how to upgrade a JavaScript project to TypeScript.

This part will introduce you to TypeScript and provide a few exercises, but this will not be your last chance to use TypeScript in this course or even in this sprint. We will continue using TypeScript in various small exercises in the upcoming sprint.

# Key learning topics & resources for this part

## Typing in JavaScript, JSDoc

**JSDoc**

As JavaScript has rapidly grown from a simple scripting language designed to add interactivity to webpages to a powerful, multipurpose programming language, JS dynamic typing often can pose a challenge for developers who work on projects where they need to collaborate with other developers.

To illustrate typing, let's consider the following example:

```js
// this is a very naive implementation, but it will do for now
function getDaysLeft(date, deadline) {
  return deadline.getDate() - date.getDate();
}

getDaysLeft('2023-08-16', '2023-08-21');
```

If we run this code, we will get an error that says `deadline.getDate` is not a function. The `deadline` parameter is a `string`, not a `Date` object. We could help the developer who uses this function to avoid this issue.

One way to do that is to add **JSDoc** comments. Here is an example:

```js
/**
 * Calculates the number of days left until the deadline.
 * @param {Date} date
 * @param {Date} deadline
 * @returns {number} number of days left
 */
function getDaysLeft(date, deadline) {
  return deadline.getDate() - date.getDate();
}

getDaysLeft('2023-08-16', '2023-08-21');
```

Using JSDoc, we have specified:
- the description of the function
- the types of the parameters
- the type of the return value

Try out this piece of code in a new JavaScript file or Quokka.js. Try hovering on the function name and see what information is revealed.

To access this information, we do not need to jump to the function and read the code. We can hover over the function name and see the necessary data type documentation. This is especially useful when working with large codebases where we import many functions or have concrete expectations about the function's input and output.

**Type checking**

While it is great that we can get some information about the function's input and output, it is still up to the developer to call it correctly. We can still pass a `string` to the `getDaysLeft` function and get an error at runtime. One way to avoid this is to enable type-checking in our code.

We can add this comment line at the top of the file to enable type-checking in a JavaScript file:

```js
// @ts-check
```

Now, given that we are working with a modern code editor, we should be able to see a red squiggly line under the first argument of the `getDaysLeft` function. Hovering over the squiggly line, we can see that the type of the argument is `string`, but it should be `Date`. Once we fix that, we can see that the second argument is also of the wrong type. We can fix that as well.

```js
// @ts-check

/**
 * Calculates the number of days left until the deadline.
 * @param {Date} date
 * @param {Date} deadline
 * @returns {number} number of days left
 */
function getDaysLeft(date, deadline) {
  return deadline.getDate() - date.getDate();
}

const days = getDaysLeft(new Date('2023-08-16'), new Date('2023-08-21'));

console.log(days);
```

We can also hover on the `days` variable and see that it is of type `number`. This is because we have specified the return type of the `getDaysLeft` function.

What if we removed the `@returns` line from the JSDoc comment? You might be pleasantly surprised that the type of the `days` variable is still `number`. Our type checker can **infer** the function's return type even if we do not provide it. It knows we are using two Date objects, it has built-in type definitions for the `getDate` method, and it can figure out that if our function consists of a `return {number} - {number}` logic, the result will be a `number`.

We could add some additional logic to illustrate type inference:

```js
// @ts-check

/**
 * Calculates the number of days left until the deadline.
 * @param {Date} date
 * @param {Date} deadline
 * @returns {number} number of days left
 */
function getDaysLeft(date, deadline) {
  return deadline.getDate() - date.getDate() + '';
}
```

We should see a squiggly line under the return statement as our function now always returns a string, while our JSDoc comment says it should return a number.

**Mini exercise 1:** Fix the bug in the `getDaysLeft` so it returns a number.

Using JSDoc comments, we can make our code more readable and less error-prone. JSDoc is a valid way to introduce typing into an existing JavaScript project.

But there are various limitations to using JSDoc comments. For example, it is lengthy, especially once we want to add types to individual variables. Also, it has a limited set of features which limits us when we need to express more complex types and relationships between them.

## Setting Up Your Code Editor for TypeScript

Install the following VS Code plugins:

- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) for Vue support
- [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors) for better error messages
- (Optional) [TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter) for import suggestions

## TypeScript (2.5 hours)

Follow this [TypeScript tutorial](https://www.youtube.com/watch?v=d56mG7DezGs). Follow along with the video and try out the code examples in your code editor.

The video is an hour long, but it introduces quite a few new concepts, so we have provided 2.5 hours for you to go through it.

## Exercise: List built-in types (1 hour)

By this point, you should be well-prepared for your first TypeScript exercise.

1. Signup for an account on [Codewars](https://www.codewars.com/).
2. Go to the [following TypeScript exercise](https://www.codewars.com/kata/.5914c6ee51f1d39b5600001c).
3. Try to solve it (there is a button in the top right corner that allows you to start the exercise).
4. Run the provided tests to see if your solution is correct.

**Hints:** You might need to look up a few additional type definitions, such as:
- [Tuples](https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types)
- `void` is a type for functions that return without a return value or where the return value should be ignored
- `never` is a type for values that never occur (e.g., used in a function that always throws an error)

Finally, you can use a literal `0x`, `0o` or `0b` prefix to specify a number in hexadecimal, octal or binary format, or use `parseInt(string value, number radix)` to convert a string to a number. The precise semantics of these number formats are not crucial for this exercise. The Hex, Binary and Octal parts are not important for us to remember, but it is nice to know that they exist.

<details>
  <summary>Possible solution</summary>

```js
export const var1Boolean: boolean = true;
export const var2Decimal: number = 13;
export const var3Hex: number = 0xf00d; // or parseInt('f00d', 16)
export const var4Binary: number = parseInt('111111', 2); // or 0b111111
export const var5Octal: number = parseInt('744', 8); // or 0o744
export const var6String: string = 'Hello, world!';
export const var7Array: any[] = [1, 'test', { a: 3 }, 4, 5];
export const var8NumericArray: number[] = [1, 2, 3, 4, 5];
export const var9Tuple: [string, number] = ['key', 12345];

export enum Color { Red = 1, Green = 2, Blue = 4 };
export const var10Enum: Color = Color.Blue;

export const var11ArrayOfAny: any[] = [1, 'test', { a: 3 }, 4, 5];
export const var12VoidFunction: () => void = () => {};
export const var13Null: null = null;
export const var14Undefined: undefined = undefined;
export const var15NeverFunction: () => never = () => { throw new Error() };
```

</details>

## Exercises: CodeWars Kata Training (2 hours)

Go to the [Codewars Kata Library](https://www.codewars.com/kata/search/typescript?q=&r%5B%5D=-7&r%5B%5D=-8&order_by=satisfaction_percent%20desc%2Ctotal_completed%20desc), which should display various TypeScript exercises of 8 kyu (easiest) and 7 kyu (a tiny bit more difficult). You can start an exercise by clicking on the "TS" icon, usually at the bottom right corner of the exercise card.

Try solving as many of these as possible in the next 2 hours. These do not require lots of TypeScript typing, but they are a good way to warm up to using TypeScript in a real project. After completing an exercise, check the solutions tab to see how others solved the same problem.

Some easy exercises to start with:
- [Convert boolean to string](https://www.codewars.com/kata/53369039d7ab3ac506000467/train/typescript)
- [Get the shortest word](https://www.codewars.com/kata/57cebe1dc6fdc20c57000ac9/train/typescript)
- [Remove First and Last Character](https://www.codewars.com/kata/56bc28ad5bdaeb48760009b0/train/typescript)
- [Sum of positive numbers](https://www.codewars.com/kata/5715eaedb436cf5606000381/train/typescript)

Some more difficult exercises:
- [Find the odd integer](https://www.codewars.com/kata/54da5a58ea159efa38000836/train/typescript)
- [Counting duplicates](https://www.codewars.com/kata/54bf1c2cd5b56cc47f0007a1/train/typescript)
- [Detect Pangram](https://www.codewars.com/kata/545cedaa9943f7fe7b000048/train/typescript)
- [Mexican Wave](https://www.codewars.com/kata/58f5c63f1e26ecda7e000029/train/typescript)

**Note:** These competitive environments often elevate various clever or overly terse solutions that try to squeeze as much as possible into a single line of code. While this is a fun exercise, there are better practices for real-world code. In real-world code, you should strive for readability and maintainability, not for the shortest possible solution to impress your peers. So, use a grain of salt when evaluating the practicality of some observed patterns.

## Introduction to Generics (0.5 hours)

In TypeScript, types can be defined to allow them to accept other types as arguments. This is called **generics**. There are some commonly used generics in TypeScript, such as `Array<T>` and `Promise<T>`. You can read them as:

```ts
// an array of T, whatever T is
Array<T>

Array<number> // an array of numbers
Array<Todo> // an array of Todos

// Same as the array shorthand T[]:
number[]
Todo[]

Promise<T> // a Promise of T, whatever T is
Promise<number> // a Promise, which will resolve into a number
Promise<Todo> // a Promise, which will resolve into a Todo

// a more complex nested example:
// a Promise, which will resolve into an Array of Todos
Promise<Array<Todo>> (same as Promise<Todo[]>)
```

At this point, you do not need to understand how to create new generics, but you should be able to read them and use the few commonly used ones, such as `Promise`. You will also get to use generics in Vue applications.

## Typing a Vue Application (1 hour)

Go through the [Vue TypeScript Composition API guide](https://vuejs.org/guide/typescript/composition-api.html). You will need to rely on it to type a Vue project in the upcoming exercise. You can **skip the few final sections** - Typing Provide / Inject, Typing Template Refs, and Typing Component Template Refs as these are not necessary for our projects at the moment.

## Exercise: Rewriting Vue NASA APOD Hands-on Solution to TypeScript (3 hours)

To bridge our knowledge of TypeScript with Vue, we will revisit the NASA APOD hands-on solution from the previous sprint and migrate it to TypeScript.

Another developer has done the first few initial steps for configuring TypeScript in the project:
- added TypeScript-related packages to `package.json`
- added `tsconfig.json` file
- added some TypeScript linting rules
- renamed `.js` files to `.ts`
- added `lang="ts"` to the `script` tag in `.vue` files
- renamed `/src/main.js` to `/src/main.ts` in `index.html` (note this works because Vite processes the `index.html` file)
- to make the types more strict, added `strict: true` to the TypeScript configuration
- configured a path alias for `@` to `src`, so that we can use `@/components` instead of `../../components` in our imports

If you were to create a new Vue project using the `npm init vite` or `npm init vue` commands, most of these steps would be done automatically.

**Task:**
Ensure that the project has no TypeScript errors, it works in dev mode and it can be built using `npm run build` without errors.

**Steps**:

1. Download the provided [TypeScript NASA APOD Hands-on](https://drive.google.com/file/d/1Q5_yi9yPtPveVvJMTOBz5Ww_Ay34dMIr/view?usp=drive_link).
2. `npm install`
3. Add your own `VITE_NASA_API_KEY` key to `.env.local`, just as in your previous hands-on project.
4. `npm run type-check`
5. Fix the TypeScript errors according to the listed error messages. Try to add types at the point where a value is declared, not where it is used. This will help you avoid having to add types in multiple places.
6. `npm run dev`
7. Verify that the application still works as expected.
8. Make sure that the `npm run build` runs successfully.
9. Once you are done, look through the provided [Typed TypeScript NASA APOD Hands-on Solution](https://drive.google.com/file/d/1Oln62DkBGsUOupauuj3kNfW5qJOLxxkr/view?usp=drive_link) to see how one could add types to this application.

If you get stuck on typing a particular part of the application, you can look at the provided [Typed TypeScript NASA APOD Hands-on Solution](https://drive.google.com/file/d/1Oln62DkBGsUOupauuj3kNfW5qJOLxxkr/view?usp=drive_link) early. Try to avoid going through files other than the one that is currently causing you issues.

**Note:** If you find TypeScript typing overwhelmingly difficult, turn off the `strict` option in `tsconfig.json` and use `any` type for types you are unsure about. While at some point you will be expected to use strict typing, for now, we want you to focus on the basics of TypeScript and keep going even if some type errors are too much to handle.

**Hint:** You can use `import type { Type1, Type2, ... } from '...'` if you want to import types from other files.

**Hint:** Where should you put your types? By default, follow the principle of **colocation** and put them in the same file as the code that uses them. Once you must share a type between multiple files, decide which file should be the "owner" of the type and keep it there. Then, import the type from other files that need it. Usually, the owner should be the file that is the most "central" to the modeling of that particular entity and, usually, most detached from the UI. So you might have it inside the `stores` or `models` folder.

# Directions for further research (1 hour+)

- What are type guards? How do they work?
- What are type assertions?
- What is the difference between `any` and `unknown` types?
- When should you rely on type inference, and when should you specify types explicitly?
