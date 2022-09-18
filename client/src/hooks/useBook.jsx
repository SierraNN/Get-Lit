import bookCache from "../utils/bookCache"
import { bookByGoogleId } from "../utils/google"

const useBook = (googleId) => {
  return new Promise((resolve, reject) => {
    let cached = bookCache.recent.getById(googleId)
    if (cached) resolve(cached)
    else {
      bookByGoogleId(googleId).then(result => {
        if (result?.kind === 'books#volume') {
          bookCache.recent.updateById(googleId, result)
          resolve(result)
        } else {
          resolve(null)
        }
      })
    }
  })
}

export default useBook