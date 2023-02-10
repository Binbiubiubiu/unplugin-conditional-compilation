const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      require('unplugin-conditional-compilation/webpack')({
        env: process.argv.pop(),
        extensions: ['.vue', '.js'],
      }),
    ],
  },
})
