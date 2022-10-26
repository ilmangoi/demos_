const { createProxyMiddleware: proxy } = require("http-proxy-middleware");
const path = require("path");
const fs = require("fs");

const mockDir = fs.readdirSync(path.resolve(__dirname, "../mocks"));
const mocks = mockDir.map((file) => require(path.resolve(__dirname, "../mocks", file)));

module.exports = (app) => {
  // !自动注册mock
  mocks.forEach((mock) => mock(app));

  app.use(
    "/local",
    proxy({
      target: "http://localhost:3001",
      changeOrigin: true,
      pathRewrite: {
        "^/local": "",
      },
    })
  );
};
