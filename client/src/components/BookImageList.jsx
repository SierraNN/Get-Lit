import { Header, List, ListItem } from "semantic-ui-react"
import BookImage from "./BookImage"

const BookImageList = ({ headerText, list }) => {
  return (
    <>
      <Header>{headerText}</Header>
      <List horizontal className="book-list">
        {list && list.length ? list.map((item, i) => <BookImage key={i} book={item} />) : <ListItem content="No books" />}
      </List>
    </>
  )
}

export default BookImageList