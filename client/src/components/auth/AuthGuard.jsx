<<<<<<< HEAD
import { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
=======
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
>>>>>>> main
import { useAuth } from "../../context/AuthContext";
import AuthService from '../../utils/auth'

const AuthGuard = (props) => {
  let [auth, setAuth] = useAuth();
<<<<<<< HEAD
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
=======
  useEffect(() => {
    if (!auth) AuthService.logout()
  }, [])
  return auth ? <Outlet /> : <Navigate to="/" replace />
>>>>>>> main
}

export default AuthGuard