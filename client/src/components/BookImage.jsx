import { Link } from "react-router-dom"
import { Image } from "semantic-ui-react"
import books from "../utils/books"

const BookImage = ({ book }) => {
  const { id, volumeInfo: { title, authors, imageLinks: { thumbnail } } } = book
  // console.log(book)
  return (
    <Link to={`/books/${id}`}>
      <Image src={thumbnail} inline onClick={() => books.recent.updateById(book.id, book)} />
    </Link>

  )
}

export default BookImage