import Http from "@/utils/http";

// 添加权限
export const addAuthApi = (authData) => Http.instance.post("/auth/addAuthNode", authData);

// 权限列表
export const getAuthListApi = () => Http.instance.get("/auth/getAuthList");
