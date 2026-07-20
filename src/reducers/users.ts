import { RECEIVE_USERS } from "../actions/users";
import type {
  User,
  ReceiveUsersAction,
  LoginAction,
  SetAuthedUserAction,
} from "../types";

const initialState: Record<string, User> = {};

export default function users(
  state = initialState,
  action: ReceiveUsersAction | LoginAction | SetAuthedUserAction,
) {
  switch (action.type) {
    case RECEIVE_USERS: {
      const { users } = action as ReceiveUsersAction;
      const newState: Record<string, User> = {};
      Object.values(users).forEach((user) => {
        newState[user.id] = user;
      });
      return {
        ...state,
        ...newState,
      };
    }
    default:
      return state;
  }
}
