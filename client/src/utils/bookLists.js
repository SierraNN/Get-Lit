import { Cache } from "./cache"

class ListService {
  recent = new Cache('recentLists', {})
  results = new Cache('listSearchResults', null)
  saved = new Cache('savedLists', [])
}

export default new ListService()