import { Cache } from "./cache"

class BookService {
  recent = new Cache('recentBooks', {})
  results = new Cache('bookSearchResults', null)
  saved = new Cache('savedBooks', [])
}

export default new BookService()