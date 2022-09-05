import { Cache } from "./cache"

class ReviewService {
  recent = new Cache('recentReviews', {})
  results = new Cache('reviewSearchResults', null)
}

export default new ReviewService()