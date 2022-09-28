import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const GuestOnly = () => {
  let [auth] = useAuth();
  let location = useLocation()
  let { state } = location
  const url = (state && state.from) ? state.from : '/'
  return !auth ? <Outlet /> : <Navigate to={url} />
}

export default GuestOnly;
