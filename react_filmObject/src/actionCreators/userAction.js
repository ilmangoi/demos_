import {
  ASYNC_USER_LOGIN,
  USER_LOGIN,
  USER_SET_USERINFO,
  USER_LOGOUT,
  ASYNC_USER_SET_MENU,
  USER_SET_MENU,
} from "@/typings/userType";

export const asyncLoginAction = (userFormData) => ({
  type: ASYNC_USER_LOGIN,
  payload: userFormData,
});

export const loginAction = (userInfo) => ({
  type: USER_LOGIN,
  payload: userInfo,
});

export const setUserInfoAction = (userInfo) => ({
  type: USER_SET_USERINFO,
  payload: userInfo,
});

export const logoutAction = () => ({
  type: USER_LOGOUT,
  payload: null,
});

export const asyncSetMenuAction = () => ({
  type: ASYNC_USER_SET_MENU,
  payload: null,
});

export const setMenuAction = (menu) => ({
  type: USER_SET_MENU,
  payload: menu,
});
