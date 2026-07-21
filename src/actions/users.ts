import type { User } from "../types";
import type { AppDispatch } from "../store";
import { loginUser } from "../utils/api";
import { setAuthedUser } from "./authedUser";

export const LOGIN = "LOGIN";
export const RECEIVE_USERS = "RECEIVE_USERS";

export function receiveUsers(users: Record<string, User>) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function handleLogin(
  user: string,
  password: string,
): (dispatch: AppDispatch) => Promise<void> {
  return async (dispatch: AppDispatch) => {
    try {
      await loginUser(user, password);
      dispatch(setAuthedUser(user));
    } catch (e) {
      console.warn("Error in handleLogin: ", e);
      return Promise.reject(e);
    }
  };
}

export function handleLogout(): (dispatch: AppDispatch) => void {
  return (dispatch: AppDispatch) => {
    dispatch(setAuthedUser(""));
  };
}
