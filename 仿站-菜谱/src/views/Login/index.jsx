import React, { PureComponent } from "react";
import { List, InputItem, Toast, Button } from "antd-mobile";
import NavHeader from "@/component/navHeader";
import connect from "./connect";

@connect
class Login extends PureComponent {
  state = {
    username: "",
    hasUsernameError: false,
    password: "",
    hasPasswordError: false,
  };

  onErrorClick = (errorName, msg = "不合法") => {
    if (this.state[errorName]) {
      Toast.info(msg);
    }
  };

  onChange = (name, errorName, value) => {
    this.setState({
      [name]: value,
      [errorName]: /^\s*$/.test(value),
    });
  };

  doLogin = async () => {
    let { hasUsernameError, hasPasswordError, username, password } = this.state;
    if ([hasUsernameError, hasPasswordError].some((v) => v)) {
      // 提示结束后focus到对应的输入框，提高用户体验
      Toast.fail("账号和密码不能为空", 3, () => this.usernameRef.current.focus());
      return;
    }
    // 防止用户没有change输入框就点击登录，因为不change的话hasUsernameError和hasPasswordError
    // 都是false，但是username和password可能为空
    if ([username, password].some((v) => v === "")) {
      Toast.fail("账号和密码不能为空", 3, () => this.usernameRef.current.focus());
      return;
    }
    await this.props.doLoginApiAction({ username, password });
    // 跳转成功后，跳转回上一个页面(通过jumpUrl记录的上一个页面)
    Toast.info("账号登录成功", 2, () => this.props.history.replace(this.props.jumpUrl));
  };

  render() {
    return (
      <div>
        <NavHeader left={true} onLeft={() => this.props.history.goBack()} leftText="返回">
          用户登录
        </NavHeader>
        <List>
          <List.Item multipleLine>
            <InputItem
              type="text"
              placeholder="请输入账号信息"
              error={this.state.hasUsernameError}
              onErrorClick={() => this.onErrorClick("hasUsernameError", "账号不能为空")}
              onChange={(value) => this.onChange("username", "hasUsernameError", value)}
              value={this.state.username}
            >
              账号:
            </InputItem>
          </List.Item>
          <List.Item multipleLine>
            <InputItem
              type="password"
              onErrorClick={() => this.onErrorClick("hasPasswordError", "密码不能为空")}
              onChange={(value) => this.onChange("password", "hasPasswordError", value)}
              placeholder="请输入密码信息"
              error={this.state.hasPasswordError}
              value={this.state.password}
            >
              密码:
            </InputItem>
          </List.Item>
          <List.Item multipleLine>
            <Button type="primary" onClick={this.doLogin}>
              登录账号
            </Button>
          </List.Item>
        </List>
      </div>
    );
  }
}

export default Login;
