import { useAppSelector } from "../store";
import Poll from "../components/Poll";

/**
 * PollList component that displays a list of polls based on whether they are answered or unanswered by the authenticated user.
 * @param props The component props containing the flag to show answered questions.
 * @param props.showAnsweredQuestions A boolean indicating whether to show answered questions.
 * @returns JSX.Element
 */
const PollList = ({
  showAnsweredQuestions,
}: {
  showAnsweredQuestions: boolean;
}) => {
  const questions = useAppSelector((state) => state.polls);
  const authedUser = useAppSelector((state) => state.authedUser);
  const users = useAppSelector((state) => state.users);
  const user = authedUser ? users[authedUser] : null;

  /**
   * Filters the list of questions based on whether they are answered or unanswered by the authenticated user.
   * Only questions that match the filter criteria are returned, and they are sorted by timestamp in descending order.
   * @returns An array of filtered questions sorted by timestamp in descending order.
   */
  const getFilteredQuestions = () => {
    return Object.values(questions)
      .filter((question) => {
        const isAnswered =
          user && user.answers[question.id] !== undefined ? true : false;
        return showAnsweredQuestions ? isAnswered : !isAnswered;
      })
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  const hasQuestions = getFilteredQuestions().length > 0;

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
