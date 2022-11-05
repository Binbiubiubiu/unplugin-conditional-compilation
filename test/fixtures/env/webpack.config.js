import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import unplugin from 'unplugin-conditional-compilation'

const r = p => resolve(dirname(fileURLToPath(import.meta.url)), p)

process.env.Mode = 'dev'

export default {
  mode: 'development',
  entry: r('src/main.js'),
  output: {
    path: r('dist/webpack'),
    filename: 'main.js',
  },
  plugins: [
    unplugin.webpack({ envVar: 'Mode' }),
  ],
  devtool: 'source-map',
}
