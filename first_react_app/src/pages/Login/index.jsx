import React, { Component, createRef } from "react";
import HyInput from "@/component/hyInput";
import HyButton from "@/component/hyButton";
import { usernameValidator, passwordValidator } from "@/utils/validator/loginFormValidator";
import { LoginWrapper } from "./style";
import withConsumer from "@/hoc/withConsumer";

@withConsumer
class Index extends Component {
  usernameInput = createRef();
  passwordInput = createRef();

  loginHandler(e) {
    e.preventDefault();
    const formItemMap = [
      [this.usernameInput, usernameValidator()],
      [this.passwordInput, passwordValidator()],
    ];
    for (const [ele, rules] of formItemMap) {
      for (const rule of rules) {
        const tip = rule.validator(ele.current.state.value);
        if (tip instanceof Error) {
          this.context.addMessage({
            content: "表单验证失败！",
            type: "error",
            duration: 1000,
          });
        }
      }
    }
  }

  render() {
    return (
      <LoginWrapper>
        <form className="login_form" onSubmit={this.loginHandler.bind(this)}>
          <div className="login_form_title">Login</div>
          <HyInput
            name="username"
            label="用户名:"
            placeHolder="请输入用户名"
            validatorRules={usernameValidator()}
            ref={this.usernameInput}
          />
          <HyInput
            name="password"
            label="密码:"
            placeHolder="请输入密码"
            showHidden={true}
            validatorRules={passwordValidator()}
            ref={this.passwordInput}
          />
          <div className="login_form_btn_group">
            <HyButton value="登录" size="small" />
          </div>
        </form>
      </LoginWrapper>
    );
  }
}

export default Index;
