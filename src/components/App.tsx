import "../App.css";
import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import PollList from "./PollList";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./Login";
import NotFound from "./NotFound";
import PollDetails from "./PollDetails";
import Leaderboard from "./Leaderboard";
import AddPoll from "./AddPoll";
import Nav from "./Nav";

function App() {
  return (
    <Fragment>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<PollList />} />
          <Route path="/questions/:question_id" element={<PollDetails />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/add" element={<AddPoll />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
}

export default App;
