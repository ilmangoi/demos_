// const Mock = require("mockjs");

// const delay = (time) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time);
//   });
// };

module.exports = (app) => {
  // 添加权限节点
  app.post("/auth/addAuthNode", (req, res) => {
    res.send({
      code: 0,
      msg: "ok",
      data: req.body,
    });
  });

  // 权限列表
  app.get("/auth/getAuthList", (req, res) => {
    res.send({
      code: 0,
      msg: "ok",
      data: [
        {
          id: 1,
          name: "后台首页",
          isMenu: 1,
          route: "/dashboard",
          icon: "aaa",
        },
        {
          id: 2,
          name: "账号管理",
          isMenu: 1,
          route: "/users",
          icon: "aaa",
          children: [
            {
              id: 3,
              name: "账号列表",
              isMenu: 1,
              route: "/users/account",
              icon: "bbb",
            },
            {
              id: 4,
              name: "添加账号",
              isMenu: 0,
              route: "/users/addAccount",
              icon: "bbb",
            },
            {
              id: 5,
              name: "删除账号",
              isMenu: 0,
              route: "/users/delAccount",
              icon: "bbb",
            },
            {
              id: 6,
              name: "修改账号",
              isMenu: 0,
              route: "/users/editAccount",
              icon: "bbb",
            },
            {
              id: 7,
              name: "角色列表",
              isMenu: 1,
              route: "/users/role",
              icon: "bbb",
            },
            {
              id: 8,
              name: "添加角色",
              isMenu: 0,
              route: "/users/addrole",
              icon: "bbb",
            },
          ],
        },
        {
          id: 9,
          name: "电影管理",
          isMenu: 1,
          route: "/films",
          icon: "aaa",
          children: [
            {
              id: 10,
              name: "正在热映",
              isMenu: 1,
              route: "/films/nowplaying",
              icon: "aaa",
            },
            {
              id: 11,
              name: "添加正在热映",
              isMenu: 1,
              route: "/films/addnowplaying",
              icon: "aaa",
            },
            {
              id: 12,
              name: "即将上映",
              isMenu: 1,
              route: "/films/comingsoon",
              icon: "aaa",
            },
          ],
        },
      ],
    });
  });
};
