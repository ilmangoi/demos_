module.exports = (app) => {
  // 用户登录
  app.post("/api/login", (req, res) => {
    let bufferData = [];
    req.on("data", (chunk) => bufferData.push(chunk));
    req.on("end", () => {
      let postString = Buffer.concat(bufferData).toString("utf-8");

      res.send({
        code: 0,
        msg: "ok",
        data: {
          uid: 2000,
          token: "fwe;fjewlfjlwfjlefewlfelffewlfewjfe",
          nickname: "张英",
          postString: JSON.parse(postString),
        },
      });
    });
  });
};
