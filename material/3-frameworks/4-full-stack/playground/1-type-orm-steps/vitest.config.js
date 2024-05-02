import path from 'node:path'
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './shared'),
      '@tests': path.resolve(__dirname, './tests'),
    },
  },
});
