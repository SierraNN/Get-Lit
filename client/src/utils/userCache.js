import { Cache } from "./cache"

class UserService {
  recent = new Cache('recentUsers', {})
  // results = new Cache('userSearchResults', null)
  saved = new Cache('savedUsers', [])
}

export default new UserService()