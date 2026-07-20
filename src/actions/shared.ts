import { getInitialData } from "../utils/api";
import { receivePolls } from "./polls";
import { receiveUsers } from "./users";
import type { Dispatch } from "redux";

export const RETRIEVE_DATA = "RETRIEVE_DATA";

export const handleInitialData = () => {
  return async (dispatch: Dispatch) => {
    const { users, questions } = await getInitialData();
    dispatch(receivePolls(questions));
    dispatch(receiveUsers(users));
  };
};
