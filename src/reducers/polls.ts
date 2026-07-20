import { ANSWER_POLL, RECEIVE_POLLS } from "../actions/polls";
import type { Question, AnswerPollAction, ReceivePollsAction } from "../types";

const initialState: Record<string, Question> = {};

export default function polls(
  state = initialState,
  action: AnswerPollAction | ReceivePollsAction,
) {
  switch (action.type) {
    case RECEIVE_POLLS: {
      const { questions } = action as ReceivePollsAction;
      const newState: Record<string, Question> = {};
      Object.values(questions).forEach((question) => {
        newState[question.id] = question;
      });
      return {
        ...state,
        ...newState,
      };
    }
    case ANSWER_POLL: {
      const { authedUser, qid, answer } = action as AnswerPollAction;

      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser]),
          },
        },
      };
    }
    default:
      return state;
  }
}
