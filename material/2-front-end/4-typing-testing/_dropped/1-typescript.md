## What is TypeScript? (0.5 hours)

**TypeScript** is a superset of JavaScript, which means all modern JavaScript (ECMAScript) code is valid TypeScript code. What makes TypeScript different to JavaScript is that it adds **static typing** to the language through its syntax. This means that we can specify the types of variables, function parameters, and function return values.

Let's look back at our `getDaysLeft` function. We can rewrite it in TypeScript like this:

```ts
function getDaysLeft(date: Date, deadline: Date): number {
  return deadline.getDate() - date.getDate();
}
```

That's a bit cleaner than the JSDoc version, isn't it? Note how these types are specified using the colon (`:`) character.

Here we have specified the types of the `date` and `deadline` parameters, as well as the return type of the function (`number`). Though, just like in our JSDoc example, we can remove the return type and TypeScript will infer it for us.

**Note:** should you use inferred types or explicitly specify them? It is handy to use a return type when writing a new function, but once you are done, you can remove the explicit return type and check if TypeScript infers the same type as you would expect. Majority of the time, if TS infers a different type, it is because you have made a mistake and the explicit return type was simply masking it. Return types should be used when TS is clueless about the return type, but that usually points to a problem with some missing type definitions inside the function.

**How can we run TypeScript code?**

While TypeScript (TS) understands JavaScript (JS), JS runtimes do not understand TS. This means that we cannot run TS code directly in the browser or Node.js. We need to **transpile** it to JS first. To run TypeScript code we can:
- compile it manually with a TypeScript compiler command-line tool (tsc) and then handle the JS files as we would normally
- use a build tool (e.g. Vite, Webpack)
- use an IDE plugin for running individual files (e.g. Quokka.js)
- (Advanced) use a JavaScript runtime with TypeScript support (e.g. Deno, Bun)

All the these options end up running the TypeScript compiler under the hood which produces JavaScript code that we are familiar with.

In this sprint part, we will explore the official TypeScript Handbook. To make sure you are ready to follow along, install TypeScript globally on your machine:

```bash
npm install -g typescript
```

Now open up the **[TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)** in your browser. At this moment, you do not need to go through the entire handbook. First:

- familiarize yourself with the Handbook's structure (in the sidebar)
- read the first introductory chapter (The TypeScript Handbook)
- (recommended) open up a new TypeScript file in Quokka.js. You can do that by creating a new file, for example `playground.ts` and running "Quokka.js: Start on Current File" command from the Command Palette. Alternatively, you can use the "Quokka.js: New TypeScript File" command, which will create a new temporary TypeScript file.

**Note:** The documentation navigation contains not just the Handbook, but also the Reference, Tutorials and so on. These are useful resources, but for now, we will focus on the Handbook.

**Note:** Most code snippets in TypeScript documentation allow you to see the data types by hovering over the variable name. This is a great way to learn how TypeScript "sees" JavaScript code and type definitions.

## TypeScript Basics (1.5 hour)

Go through the first chapter in the **Handbook - The Basics**. Try out the code snippets in your TS playground file. You can also try to write some code on your own and see if it matches your expectations.

**Note:** By the end of this chapter you will be introduced to TypeScript configuration with `tsconfig.json`. You can create this file in your project root, or just besides your playground file:

```json
{
  "compilerOptions": {
    "module": "ES2022",
    "strict": false
  }
}
```

This specifies 2 options:
- `module` - specifies the module system used for the source code. Here we specify something modern that we are already familiar with.
- `strict` - enables/disables all strict type checking options. As we are learning the basics, we will use the default - `false`. But if you are up for a challenge, you can set it to `true` which will expose you to more rigorous type checking. Also, you can use `false` for a while, then switch to `true` when you feel more comfortable with TypeScript.

There are many more options that can be specified in `tsconfig.json` to inform the TypeScript compiler how to handle your code. For this sprint, you will not need to know how to configure these files on your own.

## The Everyday Types (1.5 hours)

Go through the [Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html) section on the TypeScript Handbook.
