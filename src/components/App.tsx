import "../App.css";
import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./Login";
import Logout from "./Logout";
import NotFound from "./NotFound";
import PollDetails from "./PollDetails";
import Leaderboard from "./Leaderboard";
import AddPoll from "./AddPoll";
import Nav from "./Nav";
import Home from "./Home";
import { useAppDispatch } from "../store";
import { handleInitialData } from "../actions/shared";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Fragment>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/questions/:question_id" element={<PollDetails />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/add" element={<AddPoll />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
