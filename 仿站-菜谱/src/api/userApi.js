import Http from "@/utils/http";

const http = new Http();

/**
 * 用户登录
 * @param {object} userData {username:xxx,password:xx}
 * @returns Promise<{code,msg,data:{uid,token,nickname}}>
 */
export const doLoginApi = async (userData) => http.post("/api/login", userData);
