import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import history from "@/history";

const moduleFn = require.context(".", false, /.+\.js/i);
const modules = moduleFn.keys().reduce((prev, curr) => {
  if (curr === "./index.js") return prev;
  let reducer = moduleFn(curr).default;
  prev[curr.replace(/(\.\/|\.js)/g, "")] = reducer;
  return prev;
}, {});

// 这里不能用react-immutable的combineReducers，因为它会把state变成immutable对象，而我们需要的是一个普通的对象
// 否则connected-react-router会报错，原因是它不认识immutable对象，只认识普通对象
export default combineReducers({
  router: connectRouter(history),
  ...modules,
});
