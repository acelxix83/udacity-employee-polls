import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { handleLogout } from "../actions/users";
import { useEffect } from "react";
import reactLogo from "../assets/react.svg";

/**
 * Logout component that handles user logout and redirects to the login page after a short delay.
 * @returns JSX.Element
 */
const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  /**
   * Effect that dispatches the handleLogout action and navigates to the login page after a 2-second delay.
   * This effect runs once when the component mounts.
   * It ensures that the user is logged out and redirected to the login page.
   */
  useEffect(() => {
    setTimeout(() => {
      dispatch(handleLogout());
      navigate("/login");
    }, 2000);
  }, [dispatch, navigate]);

  return (
    <div className="logout">
      <h3 className="center">Logging you out...</h3>
      <img src={reactLogo} className="framework" alt="React logo" />
    </div>
  );
};

export default Logout;
