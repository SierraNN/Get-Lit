import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthService from '../../utils/auth'

const AuthGuard = (props) => {
  let [auth, setAuth] = useAuth();
  useEffect(() => {
    if (!auth) AuthService.logout()
  }, [])
  return auth ? <Outlet /> : <Navigate to="/" replace />
}

export default AuthGuard