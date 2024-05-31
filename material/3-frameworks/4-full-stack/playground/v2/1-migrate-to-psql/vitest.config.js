import { resolve } from 'node:path'

export default {
  test: {
    globals: true,
    poolOptions: {
      threads: {
        // performance optimization, comment out if your tests clash
        isolate: false,
      },
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@tests': resolve(__dirname, './tests'),
    },
  },
};
