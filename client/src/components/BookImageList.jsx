import { Header, List, ListItem } from "semantic-ui-react"
import BookImage from "./BookImage"
import BookLink from "./BookLink"

const BookImageList = ({ headerText, list, onImageClick = 'link' }) => {
  const renderBookImage = (book, i) => onImageClick === 'link' ? <BookLink key={i} book={book} /> : <BookImage key={i} book={book} action={onImageClick} />
  return (
    <>
      <Header>{headerText}</Header>
      <List horizontal className="display-list books">
        {list && list.length ? list.map(renderBookImage) : <ListItem content="No books" />}
      </List>
    </>
  )
}

export default BookImageList