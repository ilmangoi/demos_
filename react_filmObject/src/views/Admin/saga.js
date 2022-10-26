import { takeEvery, put, call } from "redux-saga/effects";
import { getMenuListApi } from "@/api/userApi";
import { setMenuAction } from "@/actionCreators/userAction";
import { ASYNC_USER_SET_MENU } from "@/typings/userType";

export default function* watchSaga() {
  yield takeEvery(ASYNC_USER_SET_MENU, setMenu);
}

function* setMenu() {
  let ret = yield call(getMenuListApi);
  // ret是经过清洗的数据
  yield put(setMenuAction(ret));
}
