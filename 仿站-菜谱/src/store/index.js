import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import reducer from "@/reducer";

let store;
process.env.NODE_ENV === "development"
  ? (store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk))))
  : (store = createStore(reducer, applyMiddleware(thunk)));

export default store;
