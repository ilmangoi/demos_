import { doLoginApi } from "@/api/userApi";
import * as types from "@/typings/userType";

export const doLoginApiAction = (userData) => async (dispatch) => {
  const ret = await doLoginApi(userData);
  dispatch({ type: types.USER_LOGIN_USER, payload: ret });
  return ret;
};
