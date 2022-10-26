// 用户类型
export interface UserType {
  id: number
  name: string
}

// 网络请求返回的数据类型
export interface DataType<T> {
  code: number
  msg: string
  data: T
}

// state类型
export interface IUserState {
  count: number
  users: UserType[]
}
