import express from "express";
import type { UserType } from "../../typings/userType";
import { readFile, writeFile } from "../../utils/tools";
const router = express.Router();

// 用户列表数所接口
router.get("/users", (req, res) => {
  res.api(0, readFile());
});

// 添加用户
router.post("/users", (req, res) => {
  // 接收的数据中没有id，因为类型要进行一些转换
  let postData = req.body as Omit<UserType, "id">;
  // 读取json文件中的数据，添加当前添加的用户
  let userData = readFile();
  // 添加id属性
  let user: UserType = { id: Date.now(), ...postData };
  // 把新数据添加到已有数据中
  userData.push(user);
  // 写入到文件中
  writeFile(userData);
  // 返回数据
  res.api(0, user);
});

// 删除用户
router.delete("/users/:id", (req, res) => {
  const id: number = +req.params.id;
  let userData = readFile();
  let index = userData.findIndex((item: UserType) => item.id === id);
  if (index >= 0) userData.splice(index, 1);
  writeFile(userData);
  res.api(0, id);
});

// 根据用户id来返回对应用户它的数据
router.get("/users/:id", (req, res) => {
  const id: number = +req.params.id;
  const userData = readFile();
  const user = userData.find((item: UserType) => item.id === id);
  res.api(0, user);
});

// 修改指定id的用户数据
router.put("/users/:id", (req, res) => {
  const id: number = +req.params.id;
  let postData = req.body as UserType;
  const userData = readFile();
  const index = userData.findIndex((item: UserType) => item.id === id);
  userData[index] = postData;
  writeFile(userData);
  res.api(0, postData);
});

export default router;
