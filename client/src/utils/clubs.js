import { Cache } from "./cache"

class ClubService {
  recent = new Cache('recentClubs', {})
  results = new Cache('clubSearchResults', null)
}

export default new ClubService()