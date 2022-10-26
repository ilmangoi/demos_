import { fromJS } from "immutable";
import * as types from "@/typings/homeType";

const homeMutation = {
  [types.HOME_ADD_SWIPER](state, data) {
    return state.set("sliderData", fromJS(data));
  },
  [types.HOME_ADD_HOTCATE](state, data) {
    return state.set("hotCate", fromJS(data));
  },
};

export default homeMutation;
