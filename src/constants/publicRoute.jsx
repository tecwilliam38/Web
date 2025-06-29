import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";


const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/appointments" /> : children;
};

export default PublicRoute;
