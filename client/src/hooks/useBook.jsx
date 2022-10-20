// import { useEffect, useState } from "react"
// import BookService from "../context/BookService"
// import { useFetch } from "../context/SearchContext"

// const useBook = (googleId) => {
//   const [googleInfo, setGoogleInfo] = useState({})
//   const [appInfo, setAppInfo] = useState({})
//   const { book } = useFetch()

//   useEffect(() => {
//     let googleSubcription = BookService.googleData.subscribe(data => setGoogleInfo(data))
//     let appSubscription = book.observable.subscribe(data => setAppInfo(data))
//     BookService.setBook(googleId, book)
//     return () => {
//       googleSubcription.unsubscribe()
//       appSubscription.unsubscribe()
//     }
//   }, [googleId])

//   return { ...googleInfo, ...appInfo }
// }

// export default useBook