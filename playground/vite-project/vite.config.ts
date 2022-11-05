import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import Unplugin from 'unplugin-conditional-compilation/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Inspect(),
    Unplugin({
      env: process.argv.pop(),
      extensions: ['.vue', '.ts', '.tsx'],
    }),
  ],
})
