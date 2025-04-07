// components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth = localStorage.getItem("accessToken");

  return isAuth ? <Outlet /> : <Navigate to="/ngo/login" />;
};

export default PrivateRoute;
