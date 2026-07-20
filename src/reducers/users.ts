import { ANSWER_POLL } from "../actions/polls";
import { RECEIVE_USERS } from "../actions/users";
import type {
  User,
  ReceiveUsersAction,
  LoginAction,
  SetAuthedUserAction,
  AnswerPollAction,
} from "../types";

const initialState: Record<string, User> = {};

export default function users(
  state = initialState,
  action:
    | ReceiveUsersAction
    | LoginAction
    | SetAuthedUserAction
    | AnswerPollAction,
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
    case ANSWER_POLL: {
      const { authedUser, qid, answer } = action as AnswerPollAction;
      const user = state[authedUser];
      return {
        ...state,
        [authedUser]: {
          ...user,
          answers: {
            ...user.answers,
            [qid]: answer,
          },
        },
      };
    }
    default:
      return state;
  }
}
