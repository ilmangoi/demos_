import { createContext } from "react";

const ctx = createContext();
const { Provider, Consumer } = ctx;
export { ctx as default, Provider, Consumer };
