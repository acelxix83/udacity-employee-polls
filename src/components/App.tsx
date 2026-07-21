import "../App.css";
import { useEffect, useState } from "react";
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

/**
 * App component that serves as the main entry point for the application. It handles routing and authentication.
 * @returns JSX.Element
 */
function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  /**
   * Hook to dispatch the handleInitialData action when the component mounts.
   */
  useEffect(() => {
    dispatch(handleInitialData()).then(() => setLoading(false));
  }, [dispatch]);

  return loading ? (
    <div className="loading">
      <h2>Loading...</h2>
    </div>
  ) : (
    <div>
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
    </div>
  );
}

export default App;
