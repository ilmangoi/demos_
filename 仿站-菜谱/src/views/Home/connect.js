import * as actions from "@/actionCreator/homeActionCreator";
import { connect } from "react-redux";

export default connect((state) => state.get("home").toJS(), actions);
