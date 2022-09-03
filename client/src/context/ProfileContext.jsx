import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import AuthService from '../utils/auth'
import { MY_PROFILE } from "../utils/queries";
import { useAuth } from './AuthContext';

const ProfileContext = createContext()
// const ProfileDispatchContext = createContext()

export const useProfile = () => useContext(ProfileContext)

const ProfileProvider = ({ children }) => {
  const { loading, data } = useQuery(MY_PROFILE)

  const profile = data?.myProfile || [];

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider