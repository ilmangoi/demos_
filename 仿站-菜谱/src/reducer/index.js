import { combineReducers } from "redux-immutable";

// 自动导入
const moduleFn = require.context("./", false, /\.js$/i);
const modules = moduleFn
  .keys()
  .filter((item) => !item.includes("index.js"))
  .reduce((prev, curr) => {
    let value = moduleFn(curr).default;
    let key = /\.\/(\w+)\.js/.exec(curr)[1];
    prev[key] = value;
    return prev;
  }, {});

export default combineReducers(modules);
