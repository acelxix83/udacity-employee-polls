import type { SubmitEvent } from "react";
import { useEffect, useState } from "react";
import { handleLogin } from "../actions/users";
import { useAppDispatch, useAppSelector } from "../store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const authedUser = useAppSelector((state) => state.authedUser);
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (authedUser) {
      navigate("/");
    }
  }, [authedUser, navigate]);

  const handleLoginClick = (e: SubmitEvent<HTMLFormElement>) => {
    setError(false);
    e.preventDefault();
    dispatch(handleLogin(user, password))
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError(true);
        setPassword("");
      });
  };

  const handleSetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false);
    if (e.target.value.length > 20) {
      return;
    }

    const sanitizedQueryString = e.target.value.replace(/[^A-Za-z0-9]/g, "");
    setUser(sanitizedQueryString);
  };

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
