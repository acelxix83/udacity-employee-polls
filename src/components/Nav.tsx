import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store";

const Nav = () => {
  const authedUser = useAppSelector((state) => state.authedUser);
  const user = useAppSelector((state) => state.users[authedUser ?? ""]);

  if (!authedUser) {
    return null;
  }

  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "active" : "";

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" className={getActiveClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" className={getActiveClass}>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" className={getActiveClass}>
            New
          </NavLink>
        </li>
        <li className="logged-in-user-info">
          <img
            className="avatar-small"
            src={(user && user.avatarURL) || "null"}
            alt={`${(user && user.name) || ""}'s avatar`}
          />
          <div>{authedUser}</div>
        </li>
        <li className="">
          <NavLink to="/logout" className={getActiveClass}>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
