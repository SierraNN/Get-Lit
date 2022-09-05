import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import AuthService from '../utils/auth'
import books from "../utils/books";
import bookLists from "../utils/bookLists"
import { MY_PROFILE } from "../utils/queries";
import { useAuth } from './AuthContext';

const ProfileContext = createContext()
const ProfileDispatchContext = createContext()

export const useProfile = () => [useContext(ProfileContext), useContext(ProfileDispatchContext)]

const reducer = (state, action) => {
  // const { books, lists, reviews, clubs }=state
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, ...action.payload }
    case 'ADD_BOOK':
      const withBook = [...state.books, action.payload]
      books.saved.set(withBook)
      return { ...state, books: withBook }
    case 'REMOVE_BOOK':
      const withoutBook = state.books.filter(({ _id }) => _id !== action.payload)
      books.saved.set(withoutBook)
      return { ...state, books: withoutBook }
    case 'ADD_LIST':
      const withList = [...state.lists, action.payload]
      bookLists.saved.set(withList)
      return { ...state, lists: withList }
    case 'REMOVE_LIST':
      const noList = state.lists.filter(({ _id }) => _id !== action.payload)
      bookLists.saved.set(noList)
      return { ...state, lists: noList }
    default:
      return state
  }
}

const ProfileProvider = ({ children }) => {
  const [auth] = useAuth()
  const [profile, dispatch] = useReducer(reducer, {})
  const { loading, data, refetch } = useQuery(MY_PROFILE)
  const updateProfile = (type, payload) => dispatch({ type, payload })

  useEffect(() => {
    if (auth) refetch()
  }, [auth])

  useEffect(() => {
    if (!loading && data?.myProfile) dispatch({ type: 'SET_PROFILE', payload: data.myProfile })
  }, [loading, data])

  return (
    <ProfileDispatchContext.Provider value={updateProfile} >
      <ProfileContext.Provider value={profile}>
        {children}
      </ProfileContext.Provider>
    </ProfileDispatchContext.Provider>
  )
}

export default ProfileProvider