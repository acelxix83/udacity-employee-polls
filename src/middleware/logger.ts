import type { Middleware } from "@reduxjs/toolkit";
import type { RootState } from "../reducers";

const logger: Middleware<object, RootState> = (store) => (next) => (action) => {
  const actionType =
    typeof action === "object" && action !== null && "type" in action
      ? String(action.type)
      : "unknown-action";

  console.group(actionType);
  console.log("The action:", action);
  const result = next(action);
  console.log("The new state:", store.getState());
  console.groupEnd();

  return result;
};
export default logger;
