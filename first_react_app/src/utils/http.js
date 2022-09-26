import axios from "axios";
import settingConfig from "@/config/api/settings";
import Storage from "@/utils/storage";

export default class Http {
  storage = new Storage("local");
  token = this.storage.get("token");
  instance = axios.create();
  constructor() {
    // 响应拦截器
    this.instance.interceptors.response.use(
      (res) => res.data,
      (err) => {
        const res = err.response;
        if (res.status === 401 && res.data.msg === "token验证失败") {
          // 删除本地token
          this.storage.remove("token");
          this.storage.remove("userInfo");
          // 跳转到登录页面
          window.location.href = "/login";
        }
        return Promise.reject(err.response.data);
      }
    );

    // 请求拦截器
    this.instance.interceptors.request.use((config) => {
      config.timeout = settingConfig.timeout;
      config.baseURL = settingConfig.baseUrl;
      // 如果是访问登录以外的接口，则需要携带token
      if (config.url !== "/local/users/login") {
        config.headers["authorization"] = `Bearer ${this.token}`;
      }
      // 在生产环境中没有代理服务器，所以需要将请求地址中的local替换为空，否则请求会错误
      if (process.env.NODE_ENV !== "development" && config.url.startsWith("/local")) {
        config.url = config.url.replace("/local", "");
      }
      return config;
    });
  }

  get(url, config = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .get(url, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  post(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .post(url, data, config)
        .then((response) => {
          resolve(response.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
