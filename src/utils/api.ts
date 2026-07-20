import {
  _getUsers,
  _getQuestions,
  _saveQuestionAnswer,
  _saveQuestion,
} from "./_DATA.js";
import type { AnswerQuestionRequest, CreateQuestionRequest } from "../types";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    }),
  );
}

export function saveQuestion(question: CreateQuestionRequest) {
  return _saveQuestion(question);
}

export function saveQuestionAnswer(
  answerQuestionRequest: AnswerQuestionRequest,
) {
  return _saveQuestionAnswer(answerQuestionRequest);
}

export function loginUser(user: string, password: string) {
  return new Promise((resolve, reject) => {
    _getUsers().then((users) => {
      const userData = users[user];
      if (userData && userData.password === password) {
        resolve(userData);
      } else {
        reject(new Error("Invalid username or password"));
      }
    });
  });
}
