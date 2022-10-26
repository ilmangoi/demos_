"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 路由入口文件
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const router = express_1.default.Router();
router.use(user_1.default);
exports.default = router;
