import { Header, List, ListItem } from "semantic-ui-react"
import ReviewImage from "./ReviewImage"



const ReviewList = ({ headerText, list }) => {
  return (
    <>
      <Header>{headerText}</Header>
      <List horizontal className="display-list reviews">
        {list && list.length ? list.map((item, i) => <ReviewImage key={i} review={item} />) : <ListItem content="No reviews" />}
      </List>
    </>
  )
}

export default ReviewList 