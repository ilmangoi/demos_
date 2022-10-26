import mutations from "@/mutations/userMutation";

const initState = {
  menu: [],
  token: "",
  routes: "",
  userInfo: {},
};

const reducer = (state = initState, { type, payload }) => {
  // 策略模式
  if (mutations[type]) {
    return mutations[type](state, payload);
  }

  return state;
};

export default reducer;
