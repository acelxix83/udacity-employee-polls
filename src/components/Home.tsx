import PollList from "./PollList";
import { useState } from "react";
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";

/**
 * Home component that displays a list of polls and allows users to toggle between answered and unanswered questions.
 * @returns JSX.Element
 */
const Home = () => {
  const [showAnsweredQuestions, setShowAnsweredQuestions] = useState(false);

  return (
    <div>
      <div className="filter">
        <div className="toggle-icons">
          <span>Show Answered Questions:</span>
          <div
            className="toggle-icon"
            onClick={() => setShowAnsweredQuestions(!showAnsweredQuestions)}
          >
            {showAnsweredQuestions ? (
              <PiToggleRightFill className="toggle-active" />
            ) : (
              <PiToggleLeftFill />
            )}
          </div>
        </div>
      </div>
      <PollList showAnsweredQuestions={showAnsweredQuestions} />
    </div>
  );
};

export default Home;
