import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button, Container, Header, Image, Label, Segment } from "semantic-ui-react"
import books from "../utils/books"
import { useAuth } from '../context/AuthContext';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

const BookDetails = (props) => {
  const [auth] = useAuth()
  const { bookId } = useParams()
  const [book, setBook] = useState(null)

  useEffect(() => {
    let cached = books.recent.getById(bookId)
    if (cached) setBook(cached)
  }, [bookId])

  const [saveBook] = useMutation(SAVE_BOOK)

  const handleSave = async () => {
    console.log('hello')
    if (!book) return
    const { title, authors, categories, description } = book.volumeInfo
    const { data, error } = await saveBook({
      variables: {
        book: {
          googleId: book.id,
          title,
          authors,
          categories,
          description
        }
      }
    })
    console.log(data)
  }

  if (!book) return <div>loading</div>
  const { volumeInfo: info } = book
  console.log(book)

  return (
    <Container>
      <Header as='h1' content={info.title} />
      <Segment.Group>
        <Segment basic className="flex">
          <Image inline src={info.imageLinks.thumbnail} />
          <div className="stretch">
            <Header content="Categories" />
            <Label.Group>
              {info.categories && info.categories.map((cat, i) => <Label key={i} content={cat} />)}
            </Label.Group>

          </div>
          {auth &&
            <Button.Group vertical>
              <Button color="blue" onClick={handleSave} >Save Book</Button>
              <Button color='teal' >Add To List</Button>
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