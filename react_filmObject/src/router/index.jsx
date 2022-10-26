import React, { lazy, Suspense, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Admin from "@/views/Admin";
import NoAuth from "@/views/NoAuth";

const Login = lazy(() => import(/* webpackChunkName: 'login' */ "@/views/Login"));

const RouterView = () => {
  const token = useSelector((state) => state.user.token);
  const routes = useSelector((state) => state.user.routes); // 获取用户的路由信息
  const prevRouter = useSelector((state) => state.common.prevRouter);

  return (
    <Fragment>
      <Suspense fallback={<h3>加载中...</h3>}>
        <Switch>
          <Route
            path="/login"
            render={(router) => {
              if (token) {
                // 跳转到上一次的路由
                return <Redirect to={prevRouter || "/"} />;
              }
              return <Login {...router} />;
            }}
          />
          <Route
            path="/"
            render={(router) => {
              // 如果没有登录，跳转到登录页面
              if (!token) {
                return <Redirect to="/login" />;
              }
              // 当前用户已经登录，需要知道当前用户是否可以访问对应的路由
              // 但是要把 / 过滤掉，因为 / 是所有用户都可以访问的
              if (!routes.includes(router.location.pathname) && router.location.pathname !== "/") {
                return <NoAuth {...router} />;
              }
              // 走到这里，说明当前用户已经登录，且有权限访问对应的路由
              return <Admin {...router} />;
            }}
          />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default RouterView;
