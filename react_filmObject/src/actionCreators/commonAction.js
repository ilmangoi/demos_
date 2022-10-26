import { RECORD_PREV_ROUTER } from "@/typings/commonType";

export const recordPrevRouter = (prevRouter) => ({
  type: RECORD_PREV_ROUTER,
  payload: prevRouter,
});
