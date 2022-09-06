import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container, Header, Image, Label, Segment } from "semantic-ui-react"
import books from "../utils/books"
import { useAuth } from '../context/AuthContext';
import { useMutation } from '@apollo/client';
import { REMOVE_BOOK, SAVE_BOOK } from '../utils/mutations';
import { bookByGoogleId } from "../utils/google"
import Loading from "../components/Loading"
import { useProfile } from "../context/ProfileContext"

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
      books.recent.updateById(bookId, data)
    }
    let cached = books.recent.getById(bookId)
    if (cached) setBook(cached)
    else fetchById()
  }, [bookId])

  const [saveBook] = useMutation(SAVE_BOOK)
  const handleSave = async () => {
    if (!book) return
    const { title, authors, categories = [], description = "", imageLinks = {} } = book.volumeInfo
    let { thumbnail } = imageLinks
    const { data, error } = await saveBook({
      variables: {
        book: {
          googleId: book.id,
          title,
          authors,
          categories,
          description,
          thumbnail
        }
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
  // const info = book.volumeInfo || 
  return (
    <Container>
      <Header as='h1' content={info.title} />
      <Button icon="angle left" content="Back" onClick={() => navigate(-1)} />
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
              <Button color='teal' icon='plus' content="Add to Book List" />
              <Button color='teal' icon='pencil' content="Write a Review" onClick={() => navigate(`/books/${book.id}/reviews/new`)} />
            </Button.Group>
          }

        </Segment>
        <Segment>
          {info.description}
        </Segment>
      </Segment.Group>
    </Container>
  )
}

export default BookDetails