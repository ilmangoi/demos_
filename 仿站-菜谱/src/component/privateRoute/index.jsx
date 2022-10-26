import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import store from "@/store";
import { COMMON_JUMP_URL } from "@/typings/commonType";

@withRouter
class PrivateRoute extends Component {
  jumpListUrl = (url) => {
    store.dispatch({ type: COMMON_JUMP_URL, payload: url });
  };

  componentDidMount() {
    //! 记录跳转前的地址，方便登录后跳回去
    //! 在封装的路由组件中记录跳转前的路由地址是效率最高的，不需要在每次跳转的时候都去记录
    this.jumpListUrl(this.props.path);
  }

  render() {
    let { path, component: Cmp } = this.props;
    const isLogin = sessionStorage.getItem("token");
    return (
      <Route
        path={path}
        render={(router) => {
          // 判断当前页面是否需要登录才能访问
          if (!isLogin) return <Redirect to="/login" />;
          return <Cmp {...router} />;
        }}
      />
    );
  }
}

export default PrivateRoute;
