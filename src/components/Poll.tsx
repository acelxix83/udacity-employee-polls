import type { Question } from "../types";
import { useNavigate } from "react-router-dom";

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
      <span className="timestamp">{formatDate(question.timestamp)}</span>
      <div className="poll-footer">
        <button className="submit-button" onClick={handleShow}>
          Show
        </button>
      </div>
    </div>
  );
};

export default Poll;
