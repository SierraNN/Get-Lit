<<<<<<< HEAD
import { Navigate, Outlet, useLocation } from "react-router-dom";
=======
import { Navigate, Outlet } from "react-router-dom";
>>>>>>> main
import { useAuth } from "../../context/AuthContext";

export const GuestOnly = () => {
  let [auth] = useAuth();
<<<<<<< HEAD
  let location = useLocation()
  let { state } = location
  const url = (state && state.from) ? state.from : '/'
  console.log(location)
  return !auth ? <Outlet /> : <Navigate to={url} />
=======
  return !auth ? <Outlet /> : <Navigate to="/" />
>>>>>>> main
}

export default GuestOnly;
