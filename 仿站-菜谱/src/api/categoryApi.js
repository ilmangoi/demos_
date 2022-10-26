import Http from "@/utils/http";

const http = new Http();

// 获取分类
export const getCategoryListApi = () => http.get("/api/category");
// 食材
export const getMaterialListApi = () => http.get("/api/material");

export default http.cancelAllRequest.bind(http);
