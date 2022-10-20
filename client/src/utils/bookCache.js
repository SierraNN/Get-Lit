import { Cache } from "./cache"

class BookService {
  google = new Cache('googleBooks', {})
  // appData = new Cache('appBooks', {})
  results = new Cache('bookSearchResults', null)
  // saved = new Cache('savedBooks', [])
  clear = () => {
    this.google.clear()
    // this.appData.clear()
    this.results.clear()
  }
}

export default new BookService()