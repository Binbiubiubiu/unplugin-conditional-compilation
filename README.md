# unplugin-conditional-compilation

[![NPM version](https://img.shields.io/npm/v/unplugin-conditional-compilation?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-conditional-compilation)

## Install

```bash
# npm
npm i -D unplugin-conditional-compilation

# yarn
yarn add -D unplugin-conditional-compilation

# pnpm
pnpm add -D unplugin-conditional-compilation
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from 'unplugin-conditional-compilation/vite'

export default defineConfig({
  plugins: [
    Starter({
      /* options */
    }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Starter from 'unplugin-conditional-compilation/rollup'

export default {
  plugins: [
    Starter({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-conditional-compilation/webpack')({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    [
      'unplugin-conditional-compilation/nuxt',
      {
        /* options */
      },
    ],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-conditional-compilation/webpack')({
        /* options */
      }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Starter from 'unplugin-conditional-compilation/esbuild'

build({
  plugins: [Starter()],
})
```

<br></details>


