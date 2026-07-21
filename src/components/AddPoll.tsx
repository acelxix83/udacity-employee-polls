import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { handleCreatePoll } from "../actions/polls";
import { useNavigate } from "react-router-dom";

const AddPoll = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authedUser = useAppSelector((state) => state.authedUser);
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      handleCreatePoll({
        optionOneText,
        optionTwoText,
        author: authedUser ?? "",
      }),
    ).then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      <h3>Would You Rather</h3>
      <p>Create Your Own Poll</p>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="optionOne">Option One:</label>
        <input
          className="option-input"
          id="optionOne"
          type="text"
          placeholder="Option One"
          value={optionOneText}
          maxLength={50}
          onChange={(e) => setOptionOneText(e.target.value)}
        />
        <br />
        <label htmlFor="optionTwo">Option Two:</label>
        <input
          className="option-input"
          id="optionTwo"
          type="text"
          placeholder="Option Two"
          value={optionTwoText}
          maxLength={50}
          onChange={(e) => setOptionTwoText(e.target.value)}
        />
        <br />
        <div>
          <button
            className="submit-button"
            type="submit"
            disabled={!optionOneText || !optionTwoText}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPoll;
