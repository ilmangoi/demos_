import mutations from "@/mutations/commonMutation";

const initState = {
  prevRouter: "",
};

const reducer = (state = initState, { type, payload }) => {
  // 策略模式
  if (mutations[type]) {
    return mutations[type](state, payload);
  }

  return state;
};

export default reducer;
