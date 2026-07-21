export const RECEIVE_POLLS = "RECEIVE_POLLS";
export const ANSWER_POLL = "ANSWER_POLL";
export const CREATE_POLL = "CREATE_POLL";
import type { Dispatch } from "redux";
import type {
  AnswerQuestionRequest,
  CreateQuestionRequest,
  Question,
} from "../types";
import { saveQuestionAnswer, saveQuestion } from "../utils/api";

export function receivePolls(questions: Record<string, Question>) {
  return {
    type: RECEIVE_POLLS,
    questions,
  };
}

function answerPoll(answerQuestionRequest: AnswerQuestionRequest) {
  return {
    type: ANSWER_POLL,
    authedUser: answerQuestionRequest.authedUser,
    qid: answerQuestionRequest.qid,
    answer: answerQuestionRequest.answer,
  };
}
function createPoll(question: Question) {
  return {
    type: CREATE_POLL,
    question,
  };
}

// async action creators:

export function handleAnswerPoll(info: AnswerQuestionRequest) {
  return async (dispatch: Dispatch) => {
    try {
      await saveQuestionAnswer(info);
      dispatch(answerPoll(info));
    } catch (e) {
      console.warn("Error in handleAnswerPoll: ", e);
      alert("There was an error answering the poll. Try again.");
    }
  };
}

export function handleCreatePoll(info: CreateQuestionRequest) {
  return async (dispatch: Dispatch) => {
    try {
      const question = await saveQuestion(info);
      dispatch(createPoll(question));
    } catch (e) {
      console.warn("Error in handleCreatePoll: ", e);
      alert("There was an error creating the poll. Try again.");
    }
  };
}
