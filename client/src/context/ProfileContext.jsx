import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import bookCache from "../utils/bookCache";
import { MY_PROFILE } from "../utils/queries";
import { useAuth } from './AuthContext';
import { useFetch, useSearch } from "./SearchContext";


const ProfileContext = createContext()
const ProfileDispatchContext = createContext()

export const useProfile = () => [useContext(ProfileContext), useContext(ProfileDispatchContext)]

const reducer = (state, action) => {
  const { books = [], lists = [], reviews = [], clubs = [], following = [] } = state
  switch (action.type) {
    case 'CLEAR_PROFILE':
      return {}
    case 'SET_PROFILE':
      return { ...state, ...action.payload }
    case 'UPDATE_TAGS':
      return { ...state, tags: action.payload }
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
      return { ...state, lists: withList }
    case 'REMOVE_LIST':
      const noList = lists.filter(({ _id }) => _id !== action.payload)
      return { ...state, lists: noList }
    case 'UPDATE_LIST':
      const filteredLists = lists.filter(({ _id }) => _id !== action.payload._id)
      filteredLists.push(action.payload)
      return { ...state, lists: filteredLists }
    case 'ADD_CLUB':
      const withClub = [...clubs, action.payload]
      return { ...state, clubs: withClub }
    case 'REMOVE_CLUB':
      const noClub = clubs.filter(({ _id }) => _id !== action.payload)
      return { ...state, clubs: noClub }
    case 'UPDATE_CLUB':
      const filteredClubs = clubs.filter(({ _id }) => _id !== action.payload._id)
      filteredClubs.push(action.payload)
      return { ...state, clubs: filteredClubs }
    case 'ADD_REVIEW':
      const withReview = [...reviews, action.payload]
      return { ...state, reviews: withReview }
    case 'REMOVE_REVIEW':
      const noReview = reviews.filter(({ _id }) => _id !== action.payload)
      return { ...state, reviews: noReview }
    case 'UPDATE_REVIEW':
      const filteredReviews = reviews.filter(({ _id }) => _id !== action.payload._id)
      filteredReviews.push(action.payload)
      return { ...state, reviews: filteredReviews }
    default:
      return state
  }
}

const ProfileProvider = ({ children }) => {
  const [auth] = useAuth()
  const [profile, dispatch] = useReducer(reducer, {})
  const { user } = useFetch()
  const { loading, data, refetch } = useQuery(MY_PROFILE)

  const { clearCache } = useSearch()
  const updateProfile = (type, payload) => {
    if (type === 'CLEAR_PROFILE') clearCache()
    dispatch({ type, payload })
  }

  useEffect(() => {
    if (auth) refetch()
  }, [auth])

  useEffect(() => {
    if (!loading && data?.myProfile) {
      let profile = data.myProfile
      user.updateCacheById(profile._id, profile)
      dispatch({ type: 'SET_PROFILE', payload: profile })
    }
  }, [loading, data?.myProfile])

  return (
    <ProfileDispatchContext.Provider value={updateProfile} >
      <ProfileContext.Provider value={profile}>
        {children}
      </ProfileContext.Provider>
    </ProfileDispatchContext.Provider>
  )
}

export default ProfileProvider