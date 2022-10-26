const Mock = require("mockjs");

const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

module.exports = (app) => {
  app.post("/userinfo/addUserinfo", (req, res) => {
    let bufferData = [];
    // 如果你要在mock时想要接受post数据
    req.on("data", (chunk) => bufferData.push(chunk));
    req.on("end", () => {
      let postString = Buffer.concat(bufferData).toString("utf-8");
      let postData = JSON.parse(postString);
      res.send({
        code: 0,
        msg: "ok",
        data: postData,
      });
    });
  });

  app.get("/userinfo/userList", async (req, res) => {
    let { page = 1, username = "" } = req.query;

    let data = Array(10)
      .fill("")
      .map((_, index) => ({
        id: 10 * page + index,
        birthday: Mock.mock("@date()"),
        username: username ? "搜索用户--" + username : Mock.mock("@name"),
        nickname: Mock.mock("@cname"),
        ...Mock.mock({
          "sex|1": [1, 2],
        }),
        ...Mock.mock({
          "age|1-200": 10,
        }),
        city: Mock.mock("@city"),
        avatar: Mock.Random.image("200x100", "#50B347", "#FFF", "Mock-" + index),
      }));
    res.send({
      code: 0,
      msg: "ok",
      data: {
        users: data,
        total: 100,
      },
    });
  });

  app.get("/userinfo/delUser/:id", (req, res) => {
    let { id } = req.params;
    delay(500).then(() => {
      res.send({
        code: 0,
        msg: "ok",
        data: id,
      });
    });
  });

  // 修改用户
  app.put("/userinfo/editUser/:id", (req, res) => {
    let id = +req.params.id;
    res.send({
      code: 0,
      msg: "ok",
      data: id,
    });
  });

  // 根据id集合来返回对应的用户数据
  app.post("/userinfo/selectUsers", (req, res) => {
    let { ids = [] } = req.body;
    let data = Array(ids.length)
      .fill("")
      .map((_, index) => ({
        id: ++index,
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
      }));
    res.send({
      code: 0,
      msg: "ok",
      data,
    });
  });

  // 根据用户id返回对应用户信息
  app.get("/userinfo/getUserInfo/:id", (req, res) => {
    let id = +req.params.id;
    res.send({
      code: 0,
      msg: "ok",
      data: {
        id,
        birthday: Mock.mock("@date()"),
        username: Mock.mock("@name"),
        nickname: Mock.mock("@cname(true)"),
        password: "admin888",
        ...Mock.mock({
          "sex|1": ["1", "2"],
        }),
        ...Mock.mock({
          "age|1-200": 10,
        }),
        lessons: ["html", "js", "react"],
        city: "1000",
        avatar: "http://www.mobiletrain.org/images_index/right-fixed-face.png",
      },
    });
  });
};
