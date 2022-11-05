import { resolve } from 'path'
import unplugin from 'unplugin-conditional-compilation'

process.env.Mode = 'dev'

export default {
  root: __dirname,
  plugins: [
    unplugin.vite({ envVar: 'Mode' }),
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
