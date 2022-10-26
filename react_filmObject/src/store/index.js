import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import createSagaMiddleware from "redux-saga";
import reducer from "@/reducer";
import { routerMiddleware } from "connected-react-router";
import history from "@/history";
import mainSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

let store;
process.env.NODE_ENV === "development"
  ? (store = createStore(reducer, composeWithDevTools(applyMiddleware(routerMiddleware(history), sagaMiddleware))))
  : (store = createStore(reducer, applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(mainSaga);

export default store;
