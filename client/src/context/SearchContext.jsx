import { useLazyQuery } from "@apollo/client";
import { useContext } from "react";
import { createContext } from "react";
import { Cache } from "../utils/cache";
import { GET_CLUB, GET_CLUBS, GET_LIST, GET_LISTS, GET_REVIEW, GET_REVIEWS, GET_USER, GET_USERS } from "../utils/queries";
import { FetchService } from "./FetchService";

import { SearchService } from "./SearchService";

const SearchContext = createContext()
export const useSearch = () => {
  const { users, lists, clubs, reviews } = useContext(SearchContext)
  return { users, lists, clubs, reviews }
}
export const useFetch = () => {
  const { user, list, club, review } = useContext(SearchContext)
  return { user, list, club, review }
}

const SearchProvider = ({ children }) => {
  const usersQuery = useLazyQuery(GET_USERS)
  const listsQuery = useLazyQuery(GET_LISTS)
  const clubsQuery = useLazyQuery(GET_CLUBS)
  const reviewsQuery = useLazyQuery(GET_REVIEWS)
  const userQuery = useLazyQuery(GET_USER)
  const listQuery = useLazyQuery(GET_LIST)
  const clubQuery = useLazyQuery(GET_CLUB)
  const reviewQuery = useLazyQuery(GET_REVIEW)
  return (
    <SearchContext.Provider value={{
      users: new SearchService('getUsers', usersQuery),
      lists: new SearchService('getLists', listsQuery),
      clubs: new SearchService('getClubs', clubsQuery),
      reviews: new SearchService('getReviews', reviewsQuery),
      user: new FetchService('getUser', userQuery),
      list: new FetchService('getList', listQuery),
      club: new FetchService('getClub', clubQuery),
      review: new FetchService('getReview', reviewQuery),
    }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
