import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { RouterTransition } from "@/assets/style/routerTransition.js";

import NotFound from "@/views/NotFound";
import Layout from "@/views/Layout";
import Detail from "@/views/Detail";
import Login from "@/views/Login";
import Favorite from "@/views/Favorite";
import Record from "@/views/Record";
import Search from "@/views/Search";

import PrivateRoute from "@/component/privateRoute";

@withRouter
class App extends Component {
  render() {
    return (
      <RouterTransition>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} timeout={200} classNames="fade">
            <Switch>
              <Route path="/detail/:id" component={Detail} />
              <Route path="/search" component={Search} />
              {/* PrivateRoute表示需要验证登录的路由 */}
              <PrivateRoute path="/favorite" component={Favorite} />
              <PrivateRoute path="/record" component={Record} />
              {/* 如果已经登录，就不允许访问登录页 */}
              <Route
                path="/login"
                render={(router) => {
                  if (sessionStorage.getItem("token")) {
                    return <Redirect to="/center" />;
                  }
                  return <Login {...router} />;
                }}
              />
              {/* 
                这里把所有需要显示底部导航的路由页面放在了一起，方便管理
                注意这里一定要放在其它路由下方，因为嵌套路由不能使用严格匹配
              */}
              <Route path="/" component={Layout} />
              <Route path="*" component={NotFound} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </RouterTransition>
    );
  }
}

export default App;
