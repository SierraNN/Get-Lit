import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Image, List, Placeholder } from "semantic-ui-react"
import bookCache from "../utils/bookCache"
import { bookByGoogleId } from "../utils/google"

const BookImage = ({ book, action, size, ...imageProps }) => {
  const [info, setInfo] = useState(null)

  const fetchGoogleData = async (googleId) => {
    try {
      const { data: book } = await bookByGoogleId(googleId)
      bookCache.google.updateById(googleId, book)
      setInfo(book)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // LOAD BOOK INFO IF NOT IN CACHE
    const { googleId, volumeInfo } = book
    if (googleId) {
      let cached = bookCache.google.getById(book.googleId)
      if (cached) setInfo(cached)
      else fetchGoogleData(book.googleId)
    } else if (volumeInfo) {
      setInfo(book)
    }
    else {
      console.error('Book info missing')
    }
  }, [book])

  if (!info) {
    return <Placeholder.Image />
  }

  const { id, volumeInfo: { title, authors, imageLinks } } = info

  const handleClick = () => {
    if (action) action(book)
  }

  const { thumbnail } = imageLinks || {}
  return thumbnail
    ? <Image {...imageProps} size={size} className={`ui image book-image `} src={thumbnail} inline onClick={handleClick} />
    : <>
      <Placeholder>
        <Header as='h3'>{title}</Header>
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

export default BookImage