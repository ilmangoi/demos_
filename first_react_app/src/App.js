import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import HyMessage from "@/component/hyMessage";
import { Provider } from "@/context/appContext";

@withRouter
class App extends Component {
  state = {
    // 创建消失队列
    messageList: [],
    // 往消息队列添加消息
    addMessage: (message) => {
      // 弹窗最多不能超过8条，超过8条就删除最早的一条
      if (this.state.messageList.length >= 8) {
        this.state.messageList.shift();
      }
      this.setState({
        messageList: this.state.messageList.concat(Object.assign(message, { hyKey: Date.now().toString(16) })),
      });
    },
    // 删除消息队列中指定的消息
    delMessage: (key) => {
      this.setState((state) => {
        return { messageList: state.messageList.filter((item) => item.hyKey !== key) };
      });
    },
  };

  componentDidMount() {
    // 页面一挂载先执行一次，因为listen在组件第一次挂载时不会回调
    this.listenerRouter(this.props.location);
    this.props.history.listen(this.listenerRouter);
  }

  // 全局路由监听
  listenerRouter = (location, action) => {
    // 登录守卫（没有登录，则踢回登录界面）
    if (location.pathname !== "/login") {
      if (!sessionStorage.getItem("token")) {
        this.props.history.push("/login");
      }
    }
    console.log(location, action);
  };

  render() {
    return (
      <Provider value={this.state}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route
            path="/login"
            // 如果已经登录，就不允许访问登录页
            render={(router) => {
              if (sessionStorage.getItem("token")) {
                return <Redirect to="/" />;
              }
              return <Login {...router} />;
            }}
          />
          <Redirect exact from="/" to="/admin" />
          <Route component={NotFound} />
        </Switch>
        {/* 全局提示组件 */}
        <HyMessage />
      </Provider>
    );
  }
}

export default App;
