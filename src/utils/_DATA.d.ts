import type {
  Question,
  CreateQuestionRequest,
  AnswerQuestionRequest,
  User,
} from "../types";
type VoteAnswer = "optionOne" | "optionTwo";

export function _getUsers(): Promise<Record<string, User>>;
export function _getQuestions(): Promise<Record<string, Question>>;
export function _saveQuestion(
  question: CreateQuestionRequest,
): Promise<Question>;
export function _saveQuestionAnswer(
  request: AnswerQuestionRequest,
): Promise<true>;
