import { resolve } from 'path'
import unplugin from 'unplugin-conditional-compilation'

export default {
  root: __dirname,
  plugins: [
    unplugin.vite({
      env: 'dev',
      include: 'foo*',
      cwd: resolve(__dirname, 'src'),
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'main',
      fileName: '[name]',
    },
    outDir: 'dist/vite',
    sourcemap: true,
  },
}
