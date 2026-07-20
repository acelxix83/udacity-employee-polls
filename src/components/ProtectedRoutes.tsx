import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const authedUser = useSelector(
    (state: { authedUser: string }) => state.authedUser,
  );

  if (!authedUser) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
