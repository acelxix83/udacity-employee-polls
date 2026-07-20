import { useParams } from "react-router-dom";
import { useAppSelector } from "../store";
import PollOption from "./PollOption";

const PollDetails = () => {
  const { question_id } = useParams<{ question_id: string }>();
  const question = useAppSelector((state) => state.polls)[question_id || ""];
  const author = useAppSelector((state) => state.users)[question?.author || ""];
  const { name, avatarURL } = author || { name: "", avatarURL: "" };

  return (
    <div>
      <h3>Poll by {name}</h3>
      <img
        src={avatarURL || undefined}
        alt={`Avatar of ${name}`}
        className="avatar"
      />
      {question ? (
        <div>
          <h2>Would You Rather</h2>
          <ul className="poll-container">
            <PollOption questionId={question_id || ""} option="optionOne" />
            <PollOption questionId={question_id || ""} option="optionTwo" />
          </ul>
        </div>
      ) : (
        <p>Question not found</p>
      )}
    </div>
  );
};

export default PollDetails;
