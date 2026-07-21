import "../App.css";
import { useEffect, useState } from "react";
import { setAuthedUser } from "../actions/authedUser";
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
  const cachedUser = sessionStorage.getItem("authedUser");
  const [loading, setLoading] = useState(true);

  /**
   * Fetches initial data and sets the authenticated user from session storage if available.
   * This effect runs once when the component mounts.
   * It dispatches the handleInitialData action to load the necessary data for the application.
   * If a cached user is found in session storage, it dispatches the setAuthedUser action to set the authenticated user in the Redux store.
   * After fetching the initial data and setting the authenticated user, it sets the loading state to false.
   */
  useEffect(() => {
    dispatch(handleInitialData()).then(() => setLoading(false));
    if (cachedUser) {
      dispatch(setAuthedUser(cachedUser));
    }
  }, [dispatch, cachedUser]);

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
