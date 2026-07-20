import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { handleInitialData } from "../actions/shared";

const PollList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleInitialData()).then(() => {
      console.log("Initial data loaded");
    });
  }, [dispatch]);
  return (
    <div>
      <h1>Poll List</h1>
    </div>
  );
};

export default PollList;
