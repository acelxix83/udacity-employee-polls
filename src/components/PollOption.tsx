import { useAppDispatch, useAppSelector } from "../store";
import { handleAnswerPoll } from "../actions/polls";
import type { User } from "../types";

const PollOption = ({
  questionId,
  option,
}: {
  questionId: string;
  option: "optionOne" | "optionTwo";
}) => {
  const dispatch = useAppDispatch();
  const question = useAppSelector((state) => state.polls)[questionId || ""];
  const authedUser: string = useAppSelector((state) => state.authedUser) || "";
  const user: User = useAppSelector((state) => state.users)[authedUser] || "";
  const hasVoted =
    user && user.answers[question.id] !== undefined ? true : false;
  const selectedThisOption = hasVoted && user.answers[question.id] === option;
  const optionVotes = question[option].votes.length;
  const totalVotes =
    question.optionOne.votes.length + question.optionTwo.votes.length;
  const percentage = totalVotes > 0 ? (optionVotes / totalVotes) * 100 : 0;

  const handleVote = (option: "optionOne" | "optionTwo") => {
    dispatch(
      handleAnswerPoll({
        authedUser: authedUser,
        qid: questionId,
        answer: option,
      }),
    );
  };

  return (
    <li className={`poll-option ${selectedThisOption ? "voted" : ""}`}>
      <h3>{question[option].text}</h3>
      <div className="poll-footer">
        {hasVoted ? (
          <p className="poll-results">
            {optionVotes} out of {totalVotes} votes ({percentage.toFixed(2)}%)
          </p>
        ) : (
          <button className="submit-button" onClick={() => handleVote(option)}>
            Vote
          </button>
        )}
      </div>
    </li>
  );
};

export default PollOption;
