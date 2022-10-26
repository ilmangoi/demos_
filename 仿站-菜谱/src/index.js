import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "reset.css"; // 重置样式
import { Provider } from "react-redux";
import store from "@/store";
import { BrowserRouter as Router } from "react-router-dom";

import { USER_INIT_LOGIN_USER } from "@/typings/userType";
import Storage from "@/utils/storage";

const sessionStorage = new Storage("session");
store.dispatch({
  type: USER_INIT_LOGIN_USER,
  payload: {
    token: sessionStorage.get("token"),
    nickname: sessionStorage.get("nickname"),
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
