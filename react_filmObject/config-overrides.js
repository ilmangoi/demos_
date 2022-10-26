const { addDecoratorsLegacy, override, fixBabelImports, addWebpackAlias } = require("customize-cra");
const path = require("path");

// 增强自定义给webpack添加相关配置
// const custom = () => (config) => {
//   config.resolve.alias["@"] = path.resolve("./src");
//   return config;
// };

module.exports = override(
  addDecoratorsLegacy(),
  // 当我们使用ESModule按需加载时，webpack会帮我们做treeShaking，但是要按需引用需要我们手动来引入样式文件
  // 非常的难以维护，所以我们可以使用babel-plugin-import来帮我们自动引入样式文件，原本babel-plugin-import
  // 是要在babelrc中配置的，但是我们使用了customize-cra来自定义webpack配置，所以我们需要在config-overrides.js中配置
  // 手动按需导入：
  // import { Button, DatePicker } from 'antd'
  // import 'antd/es/date-picker/style/index.css'
  // import 'antd/es/button/style/index.css'
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    "@api": path.resolve(__dirname, "src/api"),
    "@assets": path.resolve(__dirname, "src/assets"),
    "@views": path.resolve(__dirname, "src/views"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@typings": path.resolve(__dirname, "src/typings"),
    "@store": path.resolve(__dirname, "src/store"),
    "@config": path.resolve(__dirname, "src/config"),
    "@reducer": path.resolve(__dirname, "src/reducer"),
    "@mutations": path.resolve(__dirname, "src/mutations"),
    "@components": path.resolve(__dirname, "src/components"),
  })
);
