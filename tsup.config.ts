import type { Options } from 'tsup'

export default <Options>{
  entryPoints: [
    'src/*.ts',
  ],
  clean: true,
  format: ['cjs', 'esm'],
  dts: true,
  external: ['html-webpack-plugin'],
  onSuccess: 'npm run build:fix',
  shims: true,
  splitting: true,
}
