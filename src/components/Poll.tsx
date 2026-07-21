import type { Question } from "../types";
import { useNavigate } from "react-router-dom";

/**
 * Poll component that displays a summary of a poll question and allows users to navigate to the detailed view of the question.
 * @param props The component props containing the poll question.
 * @param props.question The poll question to be displayed.
 * @returns JSX.Element
 */
const Poll = ({ question }: { question: Question }) => {
  const navigate = useNavigate();
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleShow = () => {
    navigate(`/questions/${question.id}`);
  };

  return (
    <div className="poll">
      <h3 className="author">{question.author}</h3>
      <span className="poll-detail">{formatDate(question.timestamp)}</span>
      <div className="poll-footer">
        <button className="submit-button" onClick={handleShow}>
          Show
        </button>
      </div>
    </div>
  );
};

export default Poll;
