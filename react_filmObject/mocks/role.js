const Mock = require("mockjs");

// const delay = (time) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time);
//   });
// };

module.exports = (app) => {
  // 添加角色
  app.post("/role/addRoles", (req, res) => {
    res.send({
      code: 0,
      msg: "ok",
      data: {
        id: Date.now(),
        name: req.body.name,
      },
    });
  });

  // 检查当前角色名称是否存在
  app.post("/role/checkRoleNameExists", (req, res) => {
    res.send({
      code: 0,
      msg: "ok",
      // 0不存在，1存在
      data: 0,
    });
  });

  // 角色列表数据
  app.get("/role/roleList", (req, res) => {
    let data = Array(10)
      .fill("")
      .map((_, index) => ({
        id: index + 1,
        name: Mock.mock("@cname"),
        description: Mock.mock("@cparagraph"),
      }));
    res.send({
      code: 0,
      msg: "ok",
      data: {
        roles: data,
      },
    });
  });

  // 根据角色id返回对应角色信息
  app.get("/role/getRole/:id", (req, res) => {
    let { id = 0 } = req.params;
    res.send({
      code: 0,
      msg: "ok",
      data: {
        id,
        name: Mock.mock("@cname"),
        description: Mock.mock("@cparagraph"),
      },
    });
  });

  // 修改角色
  app.post("/role/editRole/:id", (req, res) => {
    let { id = 0 } = req.params;
    let { name } = req.body;
    res.send({
      code: 0,
      msg: "ok",
      data: {
        id,
        name,
      },
    });
  });

  // 删除角色
  app.get("/role/delRole/:id", (req, res) => {
    let { id = 0 } = req.params;
    res.send({
      code: 0,
      msg: "ok",
      data: {
        id,
      },
    });
  });

  // 获取指定角色下面的用户
  app.get("/role/uidToRole/:id", (req, res) => {
    const { id = 0 } = req.params;
    let data = Array(10)
      .fill("")
      .map((_, index) => ({
        id: index + 1,
        birthday: Mock.mock("@date()"),
        username: Mock.mock("@name"),
        nickname: Mock.mock("@cname"),
        ...Mock.mock({
          "sex|1": [1, 2],
        }),
        ...Mock.mock({
          "age|1-200": 10,
        }),
        city: Mock.mock("@city"),
        avatar: Mock.Random.image("200x100", "#50B347", "#FFF", "Mock-" + index),
        roleId: Number(id),
      }));
    res.send({
      code: 0,
      msg: "ok",
      data,
    });
  });

  // 添加对应的角色下面的用户
  app.post("/role/addUserToRole/:id", (req, res) => {
    let selectedUserIds = req.body;
    let { id = 0 } = req.params;
    res.send({
      code: 0,
      msg: "ok",
      data: {
        selectedUserIds,
        id,
      },
    });
  });

  // 角色所对应权限的列表数据
  app.get("/role/roleToAuth/:id", (req, res) => {
    res.send({
      code: 0,
      msg: "ok",
      data: [2, 3, 4, 5, 6, 7, 8],
    });
  });
};
