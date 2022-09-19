import { useLazyQuery } from "@apollo/client";
import { useContext } from "react";
import { createContext } from "react";
import { Cache } from "../utils/cache";
import { GET_CLUBS, GET_LISTS, GET_REVIEWS, GET_USERS } from "../utils/queries";

class QueryService {
  constructor(name, lazyQuery) {
    this.name = name
    const [query, { loading, data, error, previousData }] = lazyQuery
    this.query = query
    this.data = data
    this.error = error
    this.loading = loading
    this.previousData = previousData
    this.cache = new Cache(`${name}Query`, [])
  }
  async refetch(...args) {
    return this.query(...args).then(response => {
      console.log('REFETCH', response)
      this.cacheResponse()
      return response
    })
  }
  cacheResponse() {
    this.cache.set(this.getQueryData())
  }
  getDocs() {
    return this.getQueryData()?.docs || []
  }
  getPage() {
    return this.getQueryData()?.page || 1
  }
  getTotalPages() {
    return this.getQueryData()?.totalPages || 1
  }
  getQueryData() {
    return this.data && this.data[this.name]
  }
  getCacheData() {
    return this.cache.get()
  }
}

const SearchContext = createContext()
export const useSearch = () => useContext(SearchContext)

const SearchProvider = ({ children }) => {
  const usersQuery = useLazyQuery(GET_USERS)
  const listsQuery = useLazyQuery(GET_LISTS)
  const clubsQuery = useLazyQuery(GET_CLUBS)
  const reviewsQuery = useLazyQuery(GET_REVIEWS)
  return (
    <SearchContext.Provider value={{
      users: new QueryService('getUsers', usersQuery),
      lists: new QueryService('getLists', listsQuery),
      clubs: new QueryService('getClubs', clubsQuery),
      reviews: new QueryService('getReviews', reviewsQuery)
    }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
