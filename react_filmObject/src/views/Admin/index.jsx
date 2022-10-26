import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recordPrevRouter } from "@/actionCreators/commonAction";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Layout, Menu, Modal } from "antd";
import { logoutAction, asyncSetMenuAction } from "@/actionCreators/userAction";
import Logo from "./components/Logo";
import icons from "@/config/icons";
import "./style.scss";

// 后台管理系统中的路由
import AdminRoute from "@/router/admin";

const { Header, Content, Sider } = Layout;
const { confirm } = Modal;

const Index = ({ location: { pathname }, history: { push } }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(recordPrevRouter(pathname)); // 记录跳转页面的路由，用于返回上一页
    dispatch(asyncSetMenuAction()); // 获取菜单数据
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // 点击左边菜单的收缩或展开
  const [collapsed, setCollapsed] = useState(false);
  // 获取此账号的昵称
  const username = useSelector((state) => state.user.userInfo.username);
  // 在redux中读取菜单配置
  const menus = useSelector((state) => {
    return state.user.menu.map((item) => ({
      ...item,
      icon: icons[item.icon], // 将图标的名称转换为图标组件
    }));
  });
  // 编程式路由跳转
  const jumpAdminUrl = (url) => push(url);
  // 退出登录
  const logout = () => {
    confirm({
      title: "退出确认",
      icon: <ExclamationCircleOutlined />,
      content: "您真的要退出本次登录吗?",
      okText: "确认退出",
      okType: "danger",
      cancelText: "考虑一下",
      onOk() {
        dispatch(logoutAction());
        // 跳转到登录页,建议使用浏览器重新加载方式来跳转
        // 不要用路由跳转,因为可能有数据延时，不太可靠
        window.location.href = "/login";
      },
      onCancel() {},
    });
  };

  return (
    <Layout className="admin-container">
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Logo collapsed={collapsed} />
        <Menu
          theme="dark"
          // 保存当前打开的菜单项
          defaultOpenKeys={[pathname.split("/").slice(0, 2).join("/")]}
          // 保存当前选中的菜单项
          defaultSelectedKeys={[pathname]}
          mode="inline"
          // 自动生成菜单（要符合相应的数据结构）
          items={menus}
          // 添加此事件，帮我们实现了点击菜单，完成路由的切换工作
          onClick={({ key }) => jumpAdminUrl(key)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-header-background">
          <span>{username}</span>
          <span onClick={logout}>退出登录</span>
        </Header>
        <Content
          style={{
            margin: "16px 16px",
          }}
        >
          <main className="site-layout-background">
            <AdminRoute />
          </main>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;
