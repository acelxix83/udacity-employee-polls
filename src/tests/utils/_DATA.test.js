import * as _DATA from "../../utils/_DATA.js";
import { waitFor } from "@testing-library/react";

describe("_DATA", () => {
  it("should have a _getUsers function", async () => {
    const users = _DATA._getUsers();

    await waitFor(
      () => {
        expect(users).toBeDefined();
      },
      {
        timeout: 1000,
        interval: 100,
      },
    );
  });

  it("should have a _getQuestions function", async () => {
    const questions = _DATA._getQuestions();

    await waitFor(
      () => {
        expect(questions).toBeDefined();
      },
      {
        timeout: 1000,
        interval: 100,
      },
    );
  });

  it("should return a saved question when _saveQuestion is called", async () => {
    const questionRequest = {
      optionOneText: "Write unit tests",
      optionTwoText: "Generate unit tests",
      author: "sarahedo",
    };
    const savedQuestion = await _DATA._saveQuestion(questionRequest);
    const { optionOne, optionTwo, author } = savedQuestion;
    expect(optionOne.text).toBe(questionRequest.optionOneText);
    expect(optionTwo.text).toBe(questionRequest.optionTwoText);
    expect(author).toBe(questionRequest.author);
  });

  it("should return an error when _saveQuestion is called with missing fields", async () => {
    const questionRequest = {
      optionOneText: "Write unit tests",
      optionTwoText: "Generate unit tests",
    };
    await expect(_DATA._saveQuestion(questionRequest)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author",
    );
  });

  it("should return true when _saveQuestionAnswer is called", async () => {
    const answerRequest = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    };
    const result = await _DATA._saveQuestionAnswer(answerRequest);
    expect(result).toBe(true);
  });

  it("should return an error when _saveQuestionAnswer is called with missing fields", async () => {
    const answerRequest = {
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
    };
    await expect(_DATA._saveQuestionAnswer(answerRequest)).rejects.toEqual(
      "Please provide authedUser, qid, and answer",
    );
  });
});
