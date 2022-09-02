import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import AuthService from '../utils/auth'

const initialToken = AuthService.getToken()
const AuthStateContext = createContext(initialToken)
const AuthDispatchContext = createContext()

export const useAuth = () => [useContext(AuthStateContext), useContext(AuthDispatchContext)]

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialToken)
  useEffect(() => {
    let token = AuthService.getToken()
    if (token) setAuth(token)
  }, [])
  useEffect(() => {
    if (!auth) AuthService.logout()
    else AuthService.login(auth)
  }, [auth])
  return (
    <AuthDispatchContext.Provider value={setAuth}>
      <AuthStateContext.Provider value={auth}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export default AuthProvider