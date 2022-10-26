"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.listen(9000, '0.0.0.0', () => console.log('http://localhost:9000'));
// 跨域
app.use((0, cors_1.default)());
// 接受post请求
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// 中间件
app.use((req, res, next) => {
    res.api = (code, data) => {
        res.send({
            code,
            msg: 'ok',
            data
        });
    };
    next();
});
// 路由
app.use('/api', router_1.default);
