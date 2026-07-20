import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { handleInitialData } from "../actions/shared";
import Poll from "../components/Poll";

const PollList = ({
  showAnsweredQuestions,
}: {
  showAnsweredQuestions: boolean;
}) => {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.polls);
  const authedUser = useAppSelector((state) => state.authedUser);
  const users = useAppSelector((state) => state.users);
  const user = authedUser ? users[authedUser] : null;

  const getFilteredQuestions = () => {
    return Object.values(questions).filter((question) => {
      const isAnswered =
        user && user.answers[question.id] !== undefined ? true : false;
      return showAnsweredQuestions ? isAnswered : !isAnswered;
    });
  };

  const hasQuestions = getFilteredQuestions().length > 0;

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);
  return (
    <div className="poll-list">
      <div className="poll-list-header">
        <h2>{showAnsweredQuestions ? "Done" : "New Questions"}</h2>
      </div>
      <div className="poll-list-container">
        {!hasQuestions && (
          <p className="no-items">
            {showAnsweredQuestions
              ? "No questions answered."
              : "No new questions."}
          </p>
        )}
        <ul>
          {getFilteredQuestions().map((question) => (
            <li key={question.id}>
              <Poll question={question} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PollList;
