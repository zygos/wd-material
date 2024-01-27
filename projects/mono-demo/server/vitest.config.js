/* eslint-disable */
import path from 'path'
import { defineConfig } from "vite";
// MUST: uninstall
// import typescript from '@rollup/plugin-typescript';
// import swc from "rollup-plugin-swc";

// import typescript from "rollup-plugin-typescript2";

// const swcPlugin = (() => {
//   const plugin = swc({
//     test: 'ts',
//     swcrc: false,
//     jsc: {
//       parser: {
//         syntax: 'typescript',
//         dynamicImport: true,
//         decorators: true,
//       },
//       target: 'es2021',
//       transform: {
//         decoratorMetadata: true,
//       },
//     },
//   });

//   const originalTransform = plugin.transform;

//   const transform = function (...args) {
//     if (!args[1].endsWith('html') && !args[1].endsWith('mjs')) {
//       return originalTransform.apply(this, args);
//     }
//   };

//   return { ...plugin, transform };
// })();

// https://vitejs.dev/config/
export default defineConfig({
  // esbuild: false,
  // build: {},
  // plugins: [swcPlugin],
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '@server': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests'),
    },
  },
});
