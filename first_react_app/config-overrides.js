const { resolve } = require("path");
const { addDecoratorsLegacy, override } = require("customize-cra");

// 增强自定义给webpack添加相关配置
const custom = () => (config) => {
  config.resolve.alias["@"] = resolve("./src");
  return config;
};

module.exports = override(addDecoratorsLegacy(), custom());
