// 重构 useDispatch和useSelector
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType, RootStateType } from ".";

// 使用泛型参数把useDispatch方法返回的dispatch进行注解，注解为在入口文件中定义的合并类型
export const useAppDispatch = () => useDispatch<AppDispatchType>();
// 使用内置泛型对useSelector进行注解，让他的返回值（state）变成根state的类型，这样我们写代码的时候就有提示了
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;
