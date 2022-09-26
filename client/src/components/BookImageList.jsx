import { Header, List, ListItem } from "semantic-ui-react"
import BookImage from "./BookImage"
import BookLink from "./BookLink"

const BookImageList = ({ header, list, onImageClick = 'link' }) => {
  const renderBookImage = (book, i) => onImageClick === 'link'
    ? <BookLink key={i} book={book} />
    : <ListItem><BookImage key={i} book={book} action={onImageClick} /></ListItem>
  return (
    <>
      <Header>{header}</Header>
      <List horizontal className="display-list books">
        {/* {list && list.length ? list.map(renderBookImage) : <ListItem content={<Header content="No books" />} />} */}
        {list && list.length ? list.map(renderBookImage) : <ListItem content="None" />}
      </List>
    </>
  )
}

export default BookImageList