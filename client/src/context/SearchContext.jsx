import { useLazyQuery } from "@apollo/client";
import { useContext } from "react";
import { createContext } from "react";
import bookCache from "../utils/bookCache";
import { GET_CLUB, GET_CLUBS, GET_LIST, GET_LISTS, GET_REVIEW, GET_REVIEWS, GET_USER, GET_USERS } from "../utils/queries";

import { FetchService } from "./FetchService";
import { SearchService } from "./SearchService";

const SearchContext = createContext()
export const useSearch = () => {
  const { users, lists, clubs, reviews, logout } = useContext(SearchContext)
  return { users, lists, clubs, reviews, clearCache: logout }
}
export const useFetch = () => {
  const { user, list, club, review } = useContext(SearchContext)
  return { user, list, club, review }
}

const SearchProvider = ({ children }) => {
  const users = new SearchService('getUsers', useLazyQuery(GET_USERS))
  const lists = new SearchService('getLists', useLazyQuery(GET_LISTS))
  const clubs = new SearchService('getClubs', useLazyQuery(GET_CLUBS))
  const reviews = new SearchService('getReviews', useLazyQuery(GET_REVIEWS))
  const user = new FetchService('getUser', useLazyQuery(GET_USER))
  const list = new FetchService('getList', useLazyQuery(GET_LIST))
  const club = new FetchService('getClub', useLazyQuery(GET_CLUB))
  const review = new FetchService('getReview', useLazyQuery(GET_REVIEW))
  return (
    <SearchContext.Provider value={{
      users, lists, clubs, reviews,
      user, list, club, review,
      logout: () => {
        users.clear()
        lists.clear()
        clubs.clear()
        reviews.clear()
        bookCache.clear()
      }
    }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
