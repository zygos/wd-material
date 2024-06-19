import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'

const isCi = process.env.CI === 'true' || process.env.CI === '1'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    poolOptions: {
      threads: {
        // you can disable isolation in development for much faster tests, but
        // this results in some flaky tests
        isolate: true,
        useAtomics: !isCi,
      },
    },
    coverage: {
      provider: 'v8',
      include: [
        '**/src/**/*.ts',
      ],
      exclude: [
        '**/src/database/**',
        '**/src/entities/**',
        '**/src/trpc/index.ts',
      ],
    },

    // necessary for Vitest VS Code extension to pick up env variables
    env: loadEnv('', process.cwd(), ''),
  },
  resolve: {
    alias: {
      '@server': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests'),
    },
  },
})
