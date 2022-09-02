import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const GuestOnly = () => {
  let [auth] = useAuth();
  return !auth ? <Outlet /> : <Navigate to="/" />
}

export default GuestOnly;
