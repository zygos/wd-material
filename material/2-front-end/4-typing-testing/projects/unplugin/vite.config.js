/* eslint-disable import/no-unresolved */
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const rootDir = fileURLToPath(new URL('./src', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
      directoryAsNamespace: false,
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      include: [
        /\.[tj]s$/, // .ts, .js
        /\.vue$/, /\.vue\?vue/, // .vue
      ],
      dts: true,
      resolvers: [
        ElementPlusResolver(),
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': rootDir,
      '@stores': `${rootDir}/stores`,
    }
  }
})
