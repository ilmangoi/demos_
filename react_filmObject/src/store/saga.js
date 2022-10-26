import { all } from "redux-saga/effects";

// saga模块一般放在与组件同级的文件夹下，然后在这里自动引入
const moduleFn = require.context("../views", true, /saga\.js/i);
const modules = moduleFn.keys().reduce((prev, curr) => {
  let saga = moduleFn(curr).default;
  prev.push(saga());
  return prev;
}, []);

// 主saga，用于区别是否需要saga来处理异步操作，如果没有异步则放行
function* mainSaga() {
  yield all(modules);
}

export default mainSaga;
