import { connect } from "react-redux";
import * as actions from "@/actionCreator/userActionCreator";

export default connect(
  (state) => ({ ...state.get("user").toJS(), jumpUrl: state.getIn(["common", "jumpUrl"]) }),
  actions
);
