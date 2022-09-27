import { Header, List, ListItem } from "semantic-ui-react"
import AppList from "./AppList"
import ListHeader from "./AppListHeader"
import ReviewImage from "./ReviewImage"

const ReviewList = (props) => {
  return <AppList {...props} className="reviews" ItemComponent={ReviewImage} />

  // return (
  //   <>
  //     <ListHeader header={header} />
  //     <List horizontal className="display-list reviews">
  //       {list && list.length ? list.map((review, i) => <ReviewImage key={i} info={review} />) : <ListItem content="No reviews" />}
  //     </List>
  //   </>
  // )
}

export default ReviewList 