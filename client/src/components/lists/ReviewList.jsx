import AppList from "./AppList"
import ReviewImage from "./ReviewImage"

const ReviewList = (props) => {
  return <AppList {...props} className="reviews" ItemComponent={ReviewImage} />
}

export default ReviewList 