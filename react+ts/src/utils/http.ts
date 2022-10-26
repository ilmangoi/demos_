// 封装axios请求
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

// 标准的服务端返回数据格式
export interface DataType<T> {
  code: number;
  msg: string;
  data: T;
}

const _instance = axios.create({
  timeout: 10000,
  baseURL: "http://localhost:9000",
});

// export interface AxiosResponse<T = any, D = any>  {
//   data: T;
//   status: number;
//   statusText: string;
//   headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
//   config: AxiosRequestConfig<D>;
//   request?: any;
// }

// get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;

// 在响应拦截器中，对数据进行了解套，因此get方法返回的数据不再是AxiosResponse，而是DataType<T>
// 因此下面的get方法的返回值类型要进行改变
_instance.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err)
);

// 可以看到,axios中的get方法，它接收一个泛型T,根据这个T类型来计算返回值R，因此我们这里自己封装的get方法
// 也可以接收一个泛型T，然后返回值就是我们自己定义的DataType<T>类型，这样就有代码提示了
// export const get = <T>(url: string, config: AxiosRequestConfig<any> = {}) => _instance.get<DataType<T>>(url, config);

export const get = <T>(url: string, config: AxiosRequestConfig<any> = {}) => {
  // 由于使用了响应拦截器进行了数据解套，因此这里请求的返回值就是DataType<T>类型
  // 所以我们直接不传入T，而是把R返回类型直接覆盖为DataType<T>类型
  return _instance.get<any, DataType<T>>(url, config);
};

export const post = <T>(url: string, data: any = {}, config: AxiosRequestConfig<any> = {}) =>
  _instance.post<any, DataType<T>>(url, data, config);

export const del = <T>(url: string, config: AxiosRequestConfig<any> = {}) =>
  _instance.delete<any, DataType<T>>(url, config);

export const put = <T>(url: string, data: any = {}, config: AxiosRequestConfig<any> = {}) =>
  _instance.put<any, DataType<T>>(url, data, config);
