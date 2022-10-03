import { Header, List, ListItem } from "semantic-ui-react"
import AppList from "./AppList"
import ListHeader from "./AppListHeader"
import ReviewImage from "./ReviewImage"

const ReviewList = (props) => {
  return <AppList {...props} className="reviews" ItemComponent={ReviewImage} />
}

export default ReviewList 