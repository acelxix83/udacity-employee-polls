import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const authedUser = useSelector(
    (state: { authedUser: string }) => state.authedUser,
  );

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
      </ul>
    </nav>
  );
};

export default Nav;
