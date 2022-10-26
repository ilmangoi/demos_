const apiSettings = {
  // API base URL （生产环境直接走代理或mock，开发环境走真实服务器）
  baseUrl: process.env.NODE_ENV === "development" ? "" : "http://example",
  // API timeout
  timeout: 10000,
  // 登录页地址
  loginUrl: "/login",
};

export default apiSettings;
