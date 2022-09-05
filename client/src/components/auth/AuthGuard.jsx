import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthService from '../../utils/auth'

const AuthGuard = (props) => {
  let [auth, setAuth] = useAuth();
  let { pathname } = useLocation()
  let [wasLoggedIn, setWasLoggedIn] = useState(false)
  useEffect(() => {
    if (!auth) {
      AuthService.logout()
    } else {
      setWasLoggedIn(true)
    }
  }, [auth])
  return auth ? <Outlet /> : <Navigate to={wasLoggedIn ? "/" : "/login"} state={{ from: pathname, message: 'Please login to see that page' }} replace />
}

export default AuthGuard