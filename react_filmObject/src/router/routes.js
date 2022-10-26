// 通过代码完成 react路由实现配置式路由，配置式路由的好处在于，定义式路由是一个对象
// 后期可以通过服务器接口得到当前角色所有的路由信息后，方便去过滤
import { lazy } from "react";

const routes = [
  {
    path: "/dashboard",
    component: lazy(() => import("@/views/Dashboard")),
    key: "dashboard",
  },
  {
    path: "/users/account",
    component: lazy(() => import("@/views/Account")),
    key: "account",
  },
  {
    path: "/users/role",
    component: lazy(() => import("@/views/Role")),
    key: "role",
  },
  {
    path: "/users/auth",
    component: lazy(() => import("@/views/Auth")),
    key: "auth",
  },
  {
    path: "/films/nowplaying",
    component: lazy(() => import("@/views/Nowplaying")),
    key: "nowplaying",
  },
  {
    path: "/films/addNowplaying",
    component: lazy(() => import("@/views/AddNowplaying")),
    key: "addNowplaying",
  },
  {
    path: "/films/comingsoon",
    component: lazy(() => import("@/views/ComingSoon")),
    key: "comingsoon",
  },
  {
    path: "/order/indentList",
    component: lazy(() => import("@/views/IndentList")),
    key: "indentList",
  },
  {
    path: "*",
    component: lazy(() => import("@/views/NotFound")),
    key: "NotFound",
  },
];

export default routes;
