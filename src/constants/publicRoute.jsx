import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";


const PublicRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/appointments" /> : <Outlet />;
};

export default PublicRoute;
