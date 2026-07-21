import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

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
