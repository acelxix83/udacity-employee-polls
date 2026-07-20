import type { SubmitEvent } from "react";
import { useState } from "react";
import { handleLogin } from "../actions/users";
import { useAppDispatch } from "../store";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLoginClick = (e: SubmitEvent<HTMLFormElement>) => {
    setError(false);
    e.preventDefault();
    dispatch(handleLogin(user, password))
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setError(true);
      });
  };

  const handleSetUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    //sanitize input if needed
    if (e.target.value.length > 20) {
      return;
    }
    setUser(e.target.value);
  };

  return (
    <div>
      <h3 className="center">Employee Polls</h3>
      <div className="login-image-container"></div>
      <h3 className="center">Login</h3>
      <form onSubmit={handleLoginClick}>
        {error && <p className="error">Invalid username or password</p>}
        <label>User: </label>
        <input
          type="text"
          placeholder="User"
          value={user}
          onChange={handleSetUser}
        />
        <br />
        <label>Password: </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
