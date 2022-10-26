import * as types from "@/typings/commonType";

const commonMutation = {
  [types.COMMON_SHOWPAGEFOOTER](state, data) {
    return state.set("showPageFooter", data);
  },
  [types.COMMON_JUMP_URL](state, data) {
    return state.set("jumpUrl", data);
  },
};

export default commonMutation;
