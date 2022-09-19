import { Header, List, ListItem } from "semantic-ui-react"
import ReviewImage from "./ReviewImage"

const ReviewList = ({ headerText, list }) => {
  return (
    <>
      <Header>{headerText}</Header>
      <List horizontal className="display-list reviews">
        {list && list.length ? list.map((review, i) => <ReviewImage key={i} review={review} />) : <ListItem content="No reviews" />}
      </List>
    </>
  )
}

export default ReviewList 