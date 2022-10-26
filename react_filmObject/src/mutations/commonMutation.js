import { RECORD_PREV_ROUTER } from "@/typings/commonType";
import Storage from "@/utils/storage";

const mutation = {
  [RECORD_PREV_ROUTER]: (state, prevRouter) => {
    Storage.sessionStorage.set("preRouter", prevRouter);
    return { ...state, prevRouter };
  },
};

export default mutation;
