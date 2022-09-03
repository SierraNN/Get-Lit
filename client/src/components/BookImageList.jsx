import { List } from "semantic-ui-react"
import BookImage from "./BookImage"

const BookImageList = ({ list }) => {
  return (
    <List horizontal className="book-list">
      {list ? list.map((item, i) => <BookImage key={i} book={item} />) : 'No results'}
    </List>
  )
}

export default BookImageList