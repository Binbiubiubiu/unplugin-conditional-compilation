const { defineConfig } = require("@vue/cli-service");
const unPlugin = require("unplugin-conditional-compilation/webpack").default;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      unPlugin({
        env: process.argv.pop(),
        extensions: [".vue", ".ts", ".tsx"],
      }),
    ],
  },
});
