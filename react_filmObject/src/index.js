import React from "react";
import ReactDOM from "react-dom";
import "reset.css"; // 重置样式
import { Provider } from "react-redux";
import store from "@/store";
import { ConnectedRouter as Router } from "connected-react-router";
import history from "./history";
import RouterView from "@/router";
import { setUserInfoAction } from "@/actionCreators/userAction";
import { recordPrevRouter } from "@/actionCreators/commonAction";
import Storage from "@/utils/storage";

import { ConfigProvider } from "antd";
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from "antd/es/locale/zh_CN";
// 日历组件比较特殊，需要单独做本地化处理
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

// 登录成功数据持久化处理 -- 刷新页面后,把本地存储中的数据给写入到redux中
store.dispatch(
  setUserInfoAction({
    menu: Storage.localStorage.get("menu", []),
    routes: Storage.localStorage.get("routes", []),
    token: Storage.localStorage.get("token", ""),
    userInfo: Storage.localStorage.get("userInfo", {}),
  })
);
// 持久化上一次的路由信息，当用户在地址栏中输入登录页面的地址时，如果用户此时已经登录
// 则应该重新跳回上一个路由，那么就可以去redux中寻找prevRouter,但是redux中的数据是存
// 储在内存中的，用户在进行地址栏进行页面跳转操作时，实际上会刷新页面，也就是说程序会
// 重新执行，这就会导致redux中的数据被清空，那么prevRouter也就找不到了，无法顺利跳转
// 因此要在这里对prevRouter做持久化操作
store.dispatch(recordPrevRouter(Storage.sessionStorage.get("preRouter")));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ConfigProvider locale={zhCN}>
        <RouterView />
      </ConfigProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
