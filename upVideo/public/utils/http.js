import Storage from "./storage.js";

const cancelToken = axios.CancelToken;
const storage = new Storage("local");

export default class Http {
  token = storage.get("token");
  instance = axios.create();
  pending = [];

  constructor() {
    // 响应拦截器
    this.instance.interceptors.response.use(
      (res) => res.data,
      (err) => {
        const res = err.response;
        if (!res) return Promise.reject(err);
        if (res.status === 401 && res.data.msg === "token验证失败") {
          // 删除本地token
          storage.remove("token");
          storage.remove("userInfo");
          // 跳转到登录页面
          window.location.href = "/login";
        }
        return Promise.reject(err.response.data);
      }
    );

    // 请求拦截器
    this.instance.interceptors.request.use((config) => {
      config.timeout = 10000;
      config.baseURL = "http://localhost:3000";
      // 如果是访问登录以外的接口，则需要携带token
      if (config.url !== "/users/login") {
        config.headers["authorization"] = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  get(url, config = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .get(
          url,
          Object.assign(config, {
            cancelToken: new cancelToken((c) => {
              this.pending.push({ url, c });
            }),
          })
        )
        .then((response) => {
          resolve(response);
          this.finish(url);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log(err.message);
          } else {
            reject(err);
            this.finish(url);
          }
        });
    });
  }

  post(url, data = {}, config = {}) {
    return new Promise((resolve, reject) => {
      this.instance
        .post(
          url,
          data,
          Object.assign(config, {
            cancelToken: new cancelToken((c) => {
              this.pending.push({ url, c });
            }),
          })
        )
        .then((response) => {
          resolve(response);
          this.finish(url);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log(err.message);
          } else {
            reject(err);
            this.finish(url);
          }
        });
    });
  }

  finish(url) {
    this.pending = this.pending.filter((item) => item.url !== url);
  }

  cancel(url) {
    for (let i = 0; i < this.pending.length; i++) {
      if (this.pending[i].url === url) {
        this.pending[i].c();
        this.pending.splice(i, 1);
        break;
      }
    }
  }

  cancelAllRequest() {
    this.pending.forEach((item) => {
      item.c();
    });
    this.pending = [];
  }
}
