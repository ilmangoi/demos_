import { configureStore } from "@reduxjs/toolkit";
import type { ThunkDispatch, Action, ThunkAction } from "@reduxjs/toolkit";
// 把每个slice文件放在组件同级目录，方便操作
import user from "@/views/User/userSlice";

// 合并reducer
const store = configureStore({
  reducer: {
    user,
  },
});

// reduxjs/toolkit内置了thunk，因此它的dispatch方法可能是 Dispatch 或 ThunkDisptach 类型，
// 因此我们必须把这两个类型统一下，然后使用统一的类型去给useDispatch定义dispatch的类型，
// 否则在使用dispatch的时候可能会报错，因为它接收的是对象action类型，而不能接收函数action类型（redux-thunk赋予的能力）
// 自动整合Dispatch或ThunkDisptach
export type AppDispatchType = typeof store.dispatch;

// 得到redux中根的state类型（ReturnType是一个内置类型，用于获取函数返回值）
export type RootStateType = ReturnType<typeof store.getState>;

// 定义thunkDispatch的类型，这个类型用于注解函数action中thunkDispatch的类型
export type AppThunkDispatchType = ThunkDispatch<RootStateType, unknown, Action<string>>;

// 这个类型用于直接注解函数action，自然就会帮函数action中的thunkDispatch参数注解类型
// 这里使用了一个泛型参数ReturnType，用于表示函数action的返回值，默认为void
export type AppThunkActionType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, Action<string>>;

export default store;
