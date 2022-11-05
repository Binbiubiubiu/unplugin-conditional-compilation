import { build } from 'esbuild'
import unplugin from 'unplugin-conditional-compilation'

build({
  entryPoints: ['src/main.js'],
  bundle: true,
  outdir: 'dist/esbuild',
  sourcemap: true,
  plugins: [
    unplugin.esbuild({
      env: 'dev',
      extensions: ['.ts'],
    }),
  ],
})
