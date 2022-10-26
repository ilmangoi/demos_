import { fromJS } from "immutable";
import mutations from "@/mutations/commonMutations";

// 初始化数据
const initState = fromJS({
  showPageFooter: true,
  jumpUrl: "/center",
});

const commonReducer = (state = initState, { type, payload }) =>
  mutations[type] ? mutations[type](state, payload) : state;

export default commonReducer;
