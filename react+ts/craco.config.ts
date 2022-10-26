import { resolve } from "path";
import mockFn from "./mock";
import { Application } from "express";

type ServerType = { app: Application };

module.exports = {
  // craco支持配置babel，因此这里可以直接通过它配置antd的按需加载
  babel: {
    plugins: [["import", { libraryName: "antd", libraryDirectory: "es", style: "css" }]],
  },
  webpack: {
    alias: {
      "@": resolve("./src"),
    },
  },
  devServer: {
    open: false,
    port: 3000,
    proxy: {
      // '/api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin:true,
      //   pathRewrite: { '^/api': '' }
      // }
    },
    setupMiddlewares: (mids: any, { app }: ServerType) => {
      mockFn(app);
      return mids;
    },
  },
};
