"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.readFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
let dataFilePath = (0, path_1.resolve)('./data/user.json');
const strToJson = (str) => JSON.parse(str);
const jsonToStr = (data) => JSON.stringify(data);
// 读数据
const readFile = () => strToJson((0, fs_1.readFileSync)(dataFilePath, 'utf-8'));
exports.readFile = readFile;
// 写数据
const writeFile = (data) => {
    (0, fs_1.writeFileSync)(dataFilePath, jsonToStr(data));
};
exports.writeFile = writeFile;
