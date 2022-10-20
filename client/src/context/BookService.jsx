import { Subject } from "rxjs"
import bookCache from "../utils/bookCache"
import { bookByGoogleId } from "../utils/google"

class BookService {
  googleData = new Subject()

  setBook(googleId, fetchService) {
    this.setGoogleId(googleId)
    this.setAppQuery(googleId, fetchService)
  }
  setGoogleId(googleId) {
    this.getGoogleData(googleId)
  }
  setAppQuery(googleId, fetchService) {
    this.appData = fetchService.observable
    fetchService.setId(googleId)
  }
  clearAppQuery() {
    delete this.fetchService
  }

  getGoogleData(googleId) {
    let googleCache = bookCache.google.getById(googleId)
    if (googleCache) this.googleData.next(googleCache)
    else {
      bookByGoogleId(googleId).then(({ data }) => {
        bookCache.google.updateById(googleId, data)
        this.googleData.next(data)
      })
    }
  }
  getAppData(googleId, fetchService) {
    if (!fetchService) throw new Error('FetchService not provided')

  }
}

export default new BookService()