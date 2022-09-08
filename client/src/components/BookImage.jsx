import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Image, Placeholder } from "semantic-ui-react"
import books from "../utils/books"

const BookImage = ({ book }) => {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    if (book.googleId) setInfo(books.recent.getById(book.googleId))
    else if (book.volumeInfo) setInfo(book)
  }, [book])

  if (!info) return <Placeholder.Image />
  const { id, volumeInfo: { title, authors, imageLinks } } = info

  const { thumbnail } = imageLinks || {}
  return (
    <Link to={`/books/${id}`} className={thumbnail ? 'item' : 'item   placeholder'}>
      {thumbnail
        ? <Image className="ui image circular small" src={thumbnail} inline onClick={() => books.recent.updateById(book.id, book)} />
        : <>
          <Header as='h3'>{title}</Header>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </>
      }

    </Link>

  )
}

export default BookImage