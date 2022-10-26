import { takeEvery, put, call } from "redux-saga/effects";
import { replace } from "connected-react-router";
import { loginApi } from "@/api/userApi";
import { loginAction } from "@/actionCreators/userAction";
import { ASYNC_USER_LOGIN } from "@/typings/userType";

export default function* watchSaga() {
  yield takeEvery(ASYNC_USER_LOGIN, login);
}

function* login({ payload }) {
  let ret = yield call(loginApi, payload);
  if (ret.code === 0) {
    yield put(loginAction(ret.data));
    // 登录成功,跳转到后台首页
    yield put(replace("/"));
  }
}
