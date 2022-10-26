import Storage from "@/utils/storage";
import * as types from "@/typings/userType";

const sessionStorage = new Storage("session");
const userMutation = {
  [types.USER_LOGIN_USER](state, { token, nickname }) {
    sessionStorage.set("token", token);
    sessionStorage.set("nickname", nickname);
    return state.set("token", token).set("nickname", nickname);
  },
  [types.USER_INIT_LOGIN_USER](state, { token, nickname }) {
    return state.set("token", token).set("nickname", nickname);
  },
  [types.USER_LOGINOUT_USER](state, data) {
    sessionStorage.remove("token");
    sessionStorage.remove("nickname");
    return state.set("token", "").set("nickname", "");
  },
};

export default userMutation;
