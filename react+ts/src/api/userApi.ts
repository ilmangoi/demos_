import { del, get, post, put } from "@/utils/http";
import { UserType } from "@/typings/userType";

// 获取用户列表
export const userListApi = (page = 1) => {
  // 在调用方法时，指定类型，在组件中使用时，就无须指定
  return get<UserType[]>("/api/users");
};

// 添加用户
export const userAddApi = (userData: UserType) => {
  return post<UserType>("/api/users", userData);
};

// 删除用户
export const userDelApi = (id: number) => {
  return del<number>(`/api/users/${id}`);
};

// 根据用户id，获取用户信息
export const idToInfoApi = (id: number) => {
  return get<UserType>(`/api/users/${id}`);
};

// 把此id的用户信息进行修改保存
export const userEditApi = (id: number, userData: UserType) => {
  return put<UserType>(`/api/users/${id}`, userData);
};
