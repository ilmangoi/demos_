import React, { Component } from "react";
import NavHeader from "@/component/navHeader";
import { List } from "antd-mobile";
import { CenterContainer } from "./style";
import ShowLoginBtn from "./ui/ShowLoginBtn";
import ShowLogoutBtn from "./ui/ShowLogoutBtn";
const Item = List.Item;

class Center extends Component {
  render() {
    return (
      <CenterContainer>
        <NavHeader rightText="登录" right={true} onRight={() => this.props.history.push("/login")}>
          个人中心
        </NavHeader>
        <div className="center-logo-container">
          <img src="http://img.1314000.cn/face.png" alt="" />
          <ShowLoginBtn />
        </div>
        <List className="my-list">
          <Item arrow="horizontal" onClick={() => this.props.history.push("/favorite")}>
            查看收藏
          </Item>
          <Item arrow="horizontal" onClick={() => this.props.history.push("/record")}>
            浏览记录
          </Item>
          <Item arrow="horizontal" onClick={() => {}}>
            个人设置
          </Item>
          <Item arrow="horizontal" onClick={() => {}}>
            关于我们
          </Item>
          <Item onClick={() => {}}>
            <ShowLogoutBtn />
          </Item>
        </List>
      </CenterContainer>
    );
  }
}

export default Center;
