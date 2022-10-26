import React, { Component, Fragment } from "react";
import store from "@/store";
import { USER_LOGINOUT_USER } from "@/typings/userType";
import { Modal } from "antd-mobile";

class ShowLogoutBtn extends Component {
  logout = () => {
    Modal.alert("退出确认", "您真要的退出本次登录吗???", [
      { text: "考虑一下", onPress: () => {} },
      {
        text: "残忍退出",
        style: { color: "#FF6C0C" },
        onPress: () => {
          // 清空本地存储和redux中的数据
          // 重载一下页面 location.reload(true) location.href，保证数据可靠性
          store.dispatch({ type: USER_LOGINOUT_USER });
          window.location.reload(true);
        },
      },
    ]);
  };

  render() {
    let nickname = store.getState().getIn(["user", "nickname"]) || "";
    return (
      <Fragment>
        {nickname ? (
          <div onClick={this.logout} style={{ textAlign: "center" }}>
            用户退出
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default ShowLogoutBtn;
