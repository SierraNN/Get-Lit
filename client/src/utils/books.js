import { Cache } from "./cache"

class BookService {
  recent = new Cache('recentBooks', {})
  results = new Cache('bookSearchResults', null)

}

export default new BookService()