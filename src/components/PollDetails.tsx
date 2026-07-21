import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import PollOption from "./PollOption";
import { useEffect } from "react";

/**
 * PollDetails component that displays the details of a specific poll question, including the author and options.
 * It also handles navigation to a 404 page if the question is not found.
 * @returns JSX.Element
 */
const PollDetails = () => {
  const { question_id } = useParams<{ question_id: string }>();
  const question = useAppSelector((state) => state.polls)[question_id || ""];
  const author = useAppSelector((state) => state.users)[question?.author || ""];
  const { name, avatarURL } = author || { name: "", avatarURL: "" };

  const navigate = useNavigate();

  /**
   * Effect that checks if the question exists. If not, it navigates to a 404 page.
   * This effect runs whenever the question or navigate values change.
   * It ensures that users are redirected to a 404 page if they try to access a non-existent poll question.
   */
  useEffect(() => {
    if (!question) {
      navigate("/404"); // Redirect to a 404 page if the question is not found
    }
  }, [question, navigate]);

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
