import path from 'node:path'
import { defineConfig } from 'vite'

const isCi = process.env.CI === 'true' || process.env.CI === '1'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    poolOptions: {
      threads: {
        // performance optimizations for development, comment out if your tests clash
        isolate: isCi,
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
  },
  resolve: {
    alias: {
      '@server': path.resolve(__dirname, './src'),
      '@tests': path.resolve(__dirname, './tests'),
    },
  },
})
