import type { Application } from "express";
import express from "express";
import cors from "cors";
import rootRouter from "./router";

// ts-node-env对.d.ts文件的支持不是很好，它不会去读取.d.ts文件，所以这里直接在入口文件中声明一下
declare global {
  namespace Express {
    // 由于我们这里是想给Express.Request添加属性，所以这里要用interface进行合并，而不是导出一个新的类型
    interface Response {
      api: (code: number, data: any) => void;
    }
  }
}

const app: Application = express();
app.listen(9000, "0.0.0.0", () => console.log("http://localhost:9000"));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 使用中间件在res上添加api方法，方便返回数据
app.use((req, res, next) => {
  res.api = (code: number, data: any) => {
    res.send({
      code,
      msg: "ok",
      data,
    });
  };
  next();
});

app.use("/api", rootRouter);
