import { fromJS } from "immutable";
import mutations from "@/mutations/homeMutations";

// 初始化数据
const initState = fromJS({
  sliderData: [{ id: 0, img: "http://img.1314000.cn/listbg.jpg", title: "默认" }],
  hotCate: [],
});

const homeReducer = (state = initState, { type, payload }) =>
  mutations[type] ? mutations[type](state, payload) : state;

export default homeReducer;
