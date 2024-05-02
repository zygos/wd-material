Bundling your server code is optional, as we do not have similar issues with the server code as we do with the client code. We need to deliver a small set of JavaScript files to the client, but we do not have to worry about the server code being too large.

However, a front-end type of bundler can be useful as:
- it helps to gloss over some of the module resolution issues that we have with the server code;
- since everything is in a single file, there is no need to worry about the import aliasing;
- it is often necessary if we want to build our code with a tool like `esbuild` or `swc`. These tools offer a significant performance boost over `tsc`;
- it would allow us to package our code for different environments (e.g. Node.js CJS, ESM, browser) with a single tool.

We have added an example of using `tsup`, which uses `esbuild` under the hood.

You can build your server code with `npm run build:tsup`. You might notice that it's quite a bit faster than `tsc`.

It produces a single `index.js` file in the `dist` directory. You can run it with `node dist/index.js`. There is no need for a custom module loader, as `tsup` will bundle your code into a single file.

We have added a few `tsup` configurations at the bottom of the `server/package.json` file that allow to customize the build process. You can read more about them in the [tsup documentation](https://tsup.egoist.dev/).
