import unplugin from 'unplugin-conditional-compilation'

export default {
  input: './src/main.js',
  output: {
    dir: './dist/rollup',
    sourcemap: true,
  },
  plugins: [
    unplugin.rollup({
      env: 'dev',
      exclude: ['src/**/*'],
    }),
  ],
}
