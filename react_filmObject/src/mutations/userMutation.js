import { USER_LOGIN, USER_SET_USERINFO, USER_LOGOUT, USER_SET_MENU } from "@/typings/userType";
import Storage from "@/utils/storage";
import { replace } from "connected-react-router";

const mutation = {
  [USER_LOGIN]: (state, payload) => {
    dataPersistence(payload);
    return { ...state, ...payload };
  },
  [USER_SET_USERINFO]: (state, payload) => {
    return { ...state, ...payload };
  },
  [USER_LOGOUT]: (state, payload) => {
    clear(); // 清除本地存储
    console.log(replace("/login"));
    //! 在reducer中是不允许dispatch一个action的(使得redux保持pure)
    //! store.dispatch(replace("/login"));
    // 重置状态
    return {
      ...state,
      menu: [],
      token: "",
      routes: "",
      userInfo: {},
    };
  },
  [USER_SET_MENU]: (state, payload) => {
    Storage.localStorage.set("menu", payload);
    return { ...state, menu: payload };
  },
};

function dataPersistence(loginUserInfo) {
  Storage.localStorage.set("routes", loginUserInfo.routes);
  Storage.localStorage.set("token", loginUserInfo.token);
  Storage.localStorage.set("userInfo", loginUserInfo.userInfo);
}

function clear() {
  Storage.localStorage.remove("menu");
  Storage.localStorage.remove("routes");
  Storage.localStorage.remove("token");
  Storage.localStorage.remove("userInfo");
}

export default mutation;
