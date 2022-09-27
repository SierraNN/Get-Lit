import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Header, Image, Label, Segment } from "semantic-ui-react"
import bookCache from "../utils/bookCache"
import { useAuth } from '../context/AuthContext';
import { useMutation } from '@apollo/client';
import { REMOVE_BOOK, SAVE_BOOK } from '../utils/mutations';
import { bookByGoogleId } from "../utils/google"
import Loading from "../components/Loading"
import { useProfile } from "../context/ProfileContext"
import AddToListButton from "../components/AddToListButton"
import bookData from "../utils/bookData"

const BookDetails = (props) => {
  const [auth] = useAuth()
  const [profile, updateProfile] = useProfile()
  const { bookId } = useParams()
  const [book, setBook] = useState(null)
  const navigate = useNavigate()
  const alreadySaved = () => profile.books && profile.books.find(({ googleId }) => bookId === googleId) !== undefined

  useEffect(() => {
    const fetchById = async () => {
      const { data } = await bookByGoogleId(bookId)
      setBook(data)
      bookCache.recent.updateById(bookId, data)
    }
    let cached = bookCache.recent.getById(bookId)
    if (cached) setBook(cached)
    else fetchById()
  }, [bookId])

  const [saveBook] = useMutation(SAVE_BOOK)
  const handleSave = async () => {
    if (!book) return
    let bookForDb = bookData(book)
    const { data, error } = await saveBook({
      variables: {
        book: bookForDb
      }
    })
    if (data && data.saveBook) {
      updateProfile('ADD_BOOK', data.saveBook)
    }
  }

  const [removeBook] = useMutation(REMOVE_BOOK)
  const handleRemove = async () => {
    const id = profile.books.find(({ googleId }) => bookId === googleId)._id
    const { data, error } = await removeBook({
      variables: {
        bookId: id
      }
    })
    if (data && data.removeBook === true) {
      updateProfile('REMOVE_BOOK', id)
    }
  }
  if (!book) return <Loading message="Getting Book" />
  const { volumeInfo: info } = book

  return (
    <div className="background3">
      <Container className="ui blue-box">
        <Header as='h1' content={info.title} subheader={`By ${info.authors.join(', ')}`} />
        <Segment.Group>
          <Segment basic className="flex">
            <Image inline src={info?.imageLinks?.thumbnail} />
            <div className="stretch">
              <Header content="Categories" />
              <Label.Group>
                {info.categories && info.categories.map((cat, i) => <Label key={i} content={cat} />)}
              </Label.Group>

            </div>
            {auth &&
              <Button.Group vertical>
                {alreadySaved()
                  ? <Button color='red' icon='trash' onClick={handleRemove} content="Remove from Profile" />
                  : <Button color="blue" icon='save' onClick={handleSave} content="Save Book" />}
                <AddToListButton book={book} />
                <Button color='teal' icon='pencil' content="Write a Review" onClick={() => navigate(`/books/${book.id}/reviews/new`)} />
              </Button.Group>
            }

          </Segment>
          <Segment>
            {info.description}
          </Segment>
        </Segment.Group>
      </Container>

    </div>
  )
}

export default BookDetails