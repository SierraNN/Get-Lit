import { Cache } from "./cache"

class ClubService {
  recent = new Cache('recentClubs', {})
  results = new Cache('clubSearchResults', null)
  saved = new Cache('savedClubs', [])
}

export default new ClubService()