import { fromJS } from "immutable";
import mutations from "@/mutations/userMutation";

// 初始化数据
const initState = fromJS({
  nickname: "",
  token: "",
  uid: 1000,
});

const userReducer = (state = initState, { type, payload }) =>
  mutations[type] ? mutations[type](state, payload) : state;
export default userReducer;
