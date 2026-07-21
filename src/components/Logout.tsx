import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { handleLogout } from "../actions/users";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(handleLogout());
    navigate("/login");
  }, [dispatch, navigate]);

  return (
    <div className="logout">
      <h3 className="center">Logging you out...</h3>
    </div>
  );
};

export default Logout;
