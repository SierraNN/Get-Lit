import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Image, Placeholder } from "semantic-ui-react"
import bookCache from "../utils/bookCache"
import { bookByGoogleId } from "../utils/google"

const BookLink = ({ book }) => {
  const [info, setInfo] = useState(null)

  const fetchGoogleData = async (googleId) => {
    try {
      const { data: book } = await bookByGoogleId(googleId)
      // bookCache.google.updateById(googleId, book)
      setInfo(book)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // LOAD BOOK INFO IF NOT IN CACHE
    if (book.googleId) {
      let cached = bookCache.google.getById(book.googleId)
      if (cached) setInfo(cached)
      else fetchGoogleData(book.googleId)
    } else if (book.volumeInfo) setInfo(book)
  }, [book])

  if (!info) {
    return <Placeholder.Image />
  }

  const { id, volumeInfo: { title, authors, imageLinks } } = info

  const { thumbnail } = imageLinks || {}
  return (
    <Link to={`/books/${id}`} className={thumbnail ? 'item' : 'item placeholder'}>
      {thumbnail
        ? <Image className="ui image small" src={thumbnail} inline />
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

export default BookLink