"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tools_1 = require("../../utils/tools");
const router = express_1.default.Router();
// 用户列表数所接口
router.get('/users', (req, res) => {
    res.send({
        code: 0,
        msg: 'ok',
        data: (0, tools_1.readFile)()
    });
    // res.api(0, readFile())
});
// 添加用户
router.post('/users', (req, res) => {
    let postData = req.body;
    // 读取json文件中的数据，添加当前添加的用户
    let userData = (0, tools_1.readFile)();
    // let user = { id: Date.now(), ...postData }
    let user = Object.assign({ id: Date.now() }, postData);
    // 把新数据添加到已有数据中
    userData.push(user);
    // 写入到文件中
    (0, tools_1.writeFile)(userData);
    res.send({
        code: 0,
        msg: 'ok',
        data: user
    });
    // res.api(0, user)
});
// 删除
router.delete('/users/:id', (req, res) => {
    // unknown类型，有时会用它来完成类型的断言(转换)
    // const id: number = req.params.id as unknown as number
    const id = +req.params.id;
    // 先读取json文件中的内容
    let userData = (0, tools_1.readFile)();
    // 根据id去找
    let index = userData.findIndex((item) => item.id === id);
    if (index >= 0) {
        // 查找到用户
        userData.splice(index, 1);
    }
    // 写入到文件中
    (0, tools_1.writeFile)(userData);
    res.send({
        code: 0,
        msg: 'ok',
        data: id
    });
    // res.api(0, id)
});
// 根据用户id来返回对应用户它的数据
router.get('/users/:id', (req, res) => {
    const id = +req.params.id;
    // 先读取json文件中的内容
    const userData = (0, tools_1.readFile)();
    // 根据id去找  -- 下面使用时要判断，id是否有对应的用户，如果没有，则需要有的code值不同
    // const index = userData.findIndex((item: UserType) => item.id === id)
    const user = userData.find((item) => item.id === id);
    res.send({
        code: 0,
        msg: 'ok',
        // data: userData[index]
        data: user
    });
});
// 修改指定id的用户数据
router.put('/users/:id', (req, res) => {
    // 动态路由参数
    const id = +req.params.id;
    // 请求体的数据
    let postData = req.body;
    // 先读取json文件中的内容
    const userData = (0, tools_1.readFile)();
    const index = userData.findIndex((item) => item.id === id);
    userData[index] = postData;
    // 写入到文件中
    (0, tools_1.writeFile)(userData);
    res.send({
        code: 0,
        msg: 'ok',
        data: postData
    });
});
exports.default = router;
