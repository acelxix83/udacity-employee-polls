import { SET_AUTHED_USER } from "../actions/authedUser";
import type { SetAuthedUserAction } from "../types";

const initialState: string | null = null;

export default function authedUser(
  state = initialState,
  action: SetAuthedUserAction,
) {
  switch (action.type) {
    case SET_AUTHED_USER: {
      const { user } = action as SetAuthedUserAction;
      console.log("Setting authedUser:", user);
      return user;
    }
    default:
      return state;
  }
}
