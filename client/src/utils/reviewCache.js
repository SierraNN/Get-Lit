import { Cache } from "./cache"

class ReviewService {
  recent = new Cache('recentReviews', {})
  results = new Cache('reviewSearchResults', null)
  saved = new Cache('savedReviews', [])
}

export default new ReviewService()