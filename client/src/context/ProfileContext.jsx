import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import AuthService from '../utils/auth'
import { MY_PROFILE } from "../utils/queries";
import { useAuth } from './AuthContext';

const ProfileStateContext = createContext()
const ProfileDispatchContext = createContext()

const ProfileProvider = ({ children }) => {
  // const [auth] = useAuth()
  const { loading, data } = useQuery(MY_PROFILE)

  const profile = data?.myProfile || [];

  // useEffect(() => {
  //   if (auth) {
  //     let { data: { _id } } = AuthService.getProfile()
  //     // console.log(_id)
  //   }
  // }, [auth])

  return (
    <ProfileStateContext.Provider value={profile}>
      {children}
    </ProfileStateContext.Provider>
  )
}

export default ProfileProvider