import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUserState, UserType, DataType } from "./typings";
import type { AppThunkActionType } from "@/store";

// 限制state中的数据类型
// const userSlice: Slice<IUserState> = createSlice({
//   name: 'user',
//   initialState: {
//     count: 1
//   },
//   reducers: {}
// })

// 推荐写法,用断言
const userSlice = createSlice({
  name: "user",
  initialState: {
    count: 1,
    users: [],
  } as IUserState,
  reducers: {
    setCount(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
    setUsers(state, action: PayloadAction<UserType[]>) {
      state.users = action.payload;
    },
  },
});

export const { setCount, setUsers } = userSlice.actions;

// 着急时用
// export const fetchUser = () => async (dispatch: any) => {
//   let ret: DataType<UserType[]> = await (await fetch('/api/users')).json()
//   dispatch(setUsers(ret.data))
// }

// 推荐
// export const fetchUser = () => async (dispatch: AppThunkDispatchType) => {
//   let ret: DataType<UserType[]> = await (await fetch('/api/users')).json()
//   dispatch(setUsers(ret.data))
// }

// 方案3
export const fetchUser = (): AppThunkActionType => async (dispatch) => {
  let ret: DataType<UserType[]> = await (await fetch("/api/users")).json();
  dispatch(setUsers(ret.data));
};

export default userSlice.reducer;
