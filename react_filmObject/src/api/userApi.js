import Http from "@/utils/http";
import { message } from "antd";
import userExcelColumnConfig from "@/config/userExcelColumn";

// 用户登录
export const loginApi = (userData) => Http.instance.post("/local/users/login", userData);

// 获取当前用户的菜单
export const getMenuListApi = async () => {
  let ret = await Http.instance.post("/local/users/menu");
  if (ret.code !== 0) {
    message.error("网络异常，请刷新重新请求", 2);
    return;
  }
  // 数据清洗
  let menus = [];
  ret.data.forEach((item) => {
    if (item.children) {
      let tmp = { key: item.path, icon: item.icon, label: item.name, children: [] };
      item.children.forEach((subitem) => {
        tmp.children.push({ key: subitem.path, icon: subitem.icon, label: subitem.name });
      });
      menus.push(tmp);
    } else {
      menus.push({ key: item.path, icon: item.icon, label: item.name });
    }
  });
  return menus;
};

//! 添加用户（这里暂时走mock）
export const addUserApi = (userData) => Http.instance.post("/userinfo/addUserinfo", userData);

//! 获取用户列表
export const getUserListApi = (page = 1, username = "") => {
  let url = "/userinfo/userList?page=" + page;
  // 如果传入了username,则拼接到url上
  url = username ? url + "&username=" + username : url;
  return Http.instance.get(url);
};

//! 删除用户
export const deleteUserApi = (uid) => Http.instance.get("/userinfo/delUser/" + uid);

//! 修改用户
export const editUserInfoApi = (uid, userData) => Http.instance.post("/userinfo/editUser/" + uid, userData);

//! 根据id集合，来批量获取对应指定的id用户数据
export const selectUsersApi = async (ids) => {
  let ret = await Http.instance.post("/userinfo/selectUsers", { ids });
  if (ret.code !== 0) {
    message.error("网络请求异步，请刷新重新请求", 2);
    return;
  }
  return ret.data.map((item) => {
    let tmp = {};
    // item它是一个对象，要把对象的key更换成中文
    for (let key in item) {
      tmp[userExcelColumnConfig[key]] = item[key];
    }
    return tmp;
  });
};

//! 根据用户id获取用户信息
export const getUserInfoApi = (uid) => Http.instance.get("/userinfo/getUserInfo/" + uid);
