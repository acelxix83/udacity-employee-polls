import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * ProtectedRoutes component that restricts access to certain routes based on user authentication status.
 * If the user is not authenticated, they are redirected to the login page with a redirect query parameter.
 * @returns JSX.Element
 */
const ProtectedRoutes = () => {
  const location = useLocation();
  const authedUser = useSelector(
    (state: { authedUser: string }) => state.authedUser,
  );

  if (!authedUser) {
    return (
      <Navigate
        to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
      />
    );
  }
  return <Outlet />;
};

export default ProtectedRoutes;
