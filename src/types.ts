import type { ANSWER_POLL, CREATE_POLL, RECEIVE_POLLS } from "./actions/polls";
import { LOGIN, type RECEIVE_USERS } from "./actions/users";
import type { SET_AUTHED_USER } from "./actions/authedUser";

export interface User {
  id: string;
  password: string;
  name: string;
  avatarURL: string | null;
  answers: {
    [questionId: string]: "optionOne" | "optionTwo";
  };
  questions: string[];
}

export interface Question {
  id: string;
  author: string;
  timestamp: number;
  optionOne: {
    votes: string[];
    text: string;
  };
  optionTwo: {
    votes: string[];
    text: string;
  };
}

export interface CreateQuestionRequest {
  optionOneText: string;
  optionTwoText: string;
  author: string;
}

export interface AnswerQuestionRequest {
  authedUser: string;
  qid: string;
  answer: string;
}

export interface AnswerPollAction {
  type: typeof ANSWER_POLL;
  authedUser: string;
  qid: string;
  answer: "optionOne" | "optionTwo";
}

export interface CreatePollAction {
  type: typeof CREATE_POLL;
  question: Question;
}

export interface ReceivePollsAction {
  type: typeof RECEIVE_POLLS;
  questions: Record<string, Question>;
}

export interface ReceiveUsersAction {
  type: typeof RECEIVE_USERS;
  users: Record<string, User>;
}

export interface SetAuthedUserAction {
  type: typeof SET_AUTHED_USER;
  user: string;
}

export interface LoginAction {
  type: typeof LOGIN;
  user: string;
  password: string;
}
