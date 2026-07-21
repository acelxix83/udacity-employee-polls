import type { SubmitEvent } from "react";
import { useEffect, useState } from "react";
import { handleLogin } from "../actions/users";
import { useAppDispatch, useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";

/**
 * Login component that handles user authentication and redirects to the appropriate route upon successful login.
 * @returns JSX.Element
 */
const Login = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirectTo");
  const dispatch = useAppDispatch();
  const authedUser = useAppSelector((state) => state.authedUser);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  /**
   * Effect that checks if the user is already authenticated. If so, it navigates to the redirect route or the home page.
   * This effect runs whenever the authedUser, navigate, or redirectTo values change.
   */
  useEffect(() => {
    if (authedUser) {
      navigate(redirectTo ?? "/");
    }
  }, [authedUser, navigate, redirectTo]);

  /**
   * Handles the login form submission. It dispatches the handleLogin action with the provided username and password.
   * If the login is successful, it navigates to the redirect route or the home page. If the login fails, it sets an error state.
   * @param e Submit Event
   */
  const handleLoginClick = (e: SubmitEvent<HTMLFormElement>) => {
    setError(false);
    e.preventDefault();
    dispatch(handleLogin(user, password))
      .then(() => {
        navigate(redirectTo ?? "/");
      })
      .catch(() => {
        setError(true);
        setPassword("");
      });
  };

  /**
   * Handles the change event for the username input field. It sanitizes the input to allow only alphanumeric characters and updates the user state.
   * It also resets the error state to false.
   * @param e Change event
   * @returns void
   */
  const handleSetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    const sanitizedQueryString = e.target.value.replace(/[^A-Za-z0-9]/g, "");
    setUser(sanitizedQueryString);
  };

  /**
   * Handles the change event for the password input field and updates the password state.  It also resets the error state to false.
   * @param e Change event
   * @returns void
   */
  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setPassword(e.target.value);
  };

  return (
    <div>
      <h3 className="center">Employee Polls</h3>
      <div className="login-image-container"></div>
      <h3 className="center">Login</h3>
      <form onSubmit={handleLoginClick} className="form">
        <span>User: </span>
        <input
          name="user"
          type="text"
          placeholder="User"
          value={user}
          maxLength={20}
          onChange={handleSetUser}
        />
        <br />
        <span>Password: </span>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          maxLength={20}
          onChange={handleSetPassword}
        />
        <br />
        <button>Login</button>
        {error && <p className="error">Invalid username or password</p>}
      </form>
    </div>
  );
};

export default Login;
