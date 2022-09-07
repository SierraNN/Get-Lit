import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import AuthService from '../utils/auth'
import bookCache from "../utils/books";
import bookListCache from "../utils/bookLists"
import { MY_PROFILE } from "../utils/queries";
import { useAuth } from './AuthContext';

const ProfileContext = createContext()
const ProfileDispatchContext = createContext()

export const useProfile = () => [useContext(ProfileContext), useContext(ProfileDispatchContext)]

const reducer = (state, action) => {
  const { books = [], lists = [], reviews = [], clubs = [], following = [] } = state
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, ...action.payload }
    case 'ADD_BOOK':
      const withBook = [...books, action.payload]
      bookCache.saved.set(withBook)
      return { ...state, books: withBook }
    case 'REMOVE_BOOK':
      const withoutBook = books.filter(({ _id }) => _id !== action.payload)
      bookCache.saved.set(withoutBook)
      return { ...state, books: withoutBook }
    case 'ADD_LIST':
      const withList = [...lists, action.payload]
      bookListCache.saved.set(withList)
      return { ...state, lists: withList }
    case 'REMOVE_LIST':
      const noList = lists.filter(({ _id }) => _id !== action.payload)
      bookListCache.saved.set(noList)
      return { ...state, lists: noList }
    case 'UPDATE_LIST':
      const filteredLists = lists.filter(({ _id }) => _id !== action.payload._id)
      filteredLists.push(action.payload)
      return { ...state, lists: filteredLists }
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
    if (!loading && data?.myProfile) {
      dispatch({ type: 'SET_PROFILE', payload: data.myProfile })
      console.log({ profile: data.myProfile })
    }
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