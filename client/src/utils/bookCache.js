import { Cache } from "./cache"

class BookService {
  recent = new Cache('recentBooks', {})
  results = new Cache('bookSearchResults', null)
  saved = new Cache('savedBooks', [])
  clear = () => {
    this.recent.clear()
    this.results.clear()
    this.saved.clear()
  }
}

export default new BookService()