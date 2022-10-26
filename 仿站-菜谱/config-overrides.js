const { addDecoratorsLegacy, override, fixBabelImports, addWebpackAlias, addPostcssPlugins } = require("customize-cra");
const path = require("path");

// 增强自定义给webpack添加相关配置
// const custom = () => (config) => {
//   config.resolve.alias["@"] = path.resolve("./src");
//   return config;
// };

module.exports = override(
  addDecoratorsLegacy(),
  // custom(),
  // 当我们使用ESModule按需加载时，webpack会帮我们做treeShaking，但是要按需引用需要我们手动来引入样式文件
  // 非常的难以维护，所以我们可以使用babel-plugin-import来帮我们自动引入样式文件，原本babel-plugin-import
  // 是要在babelrc中配置的，但是我们使用了customize-cra来自定义webpack配置，所以我们需要在config-overrides.js中配置
  fixBabelImports("import", { libraryName: "antd-mobile", style: "css" }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@store": path.resolve(__dirname, "src/store"),
    "@components": path.resolve(__dirname, "src/components"),
  }),
  // 添加postcss插件,用于px转rem
  addPostcssPlugins([
    require("postcss-pxtorem")({
      rootValue: 37.5, // (Number | Function) 表示根元素字体大小或根据input参数返回根元素字体大小
      unitPrecision: 5, // （数字）允许 REM 单位增长到的十进制数字
      propList: ["*"], // 可以从 px 更改为 rem 的属性 使用通配符*启用所有属性
      selectorBlackList: [], // （数组）要忽略并保留为 px 的选择器。
      replace: true, // 替换包含 rems 的规则，而不是添加回退。
      minPixelValue: 0, // 最小的转化单位
      exclude: /node_modules/i, // 要忽略并保留为 px 的文件路径
    }),
  ])
);
