import { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button, Grid, Header, List, Modal } from "semantic-ui-react"
import { useProfile } from "../context/ProfileContext"
import bookData from "../utils/bookData"
import { ADD_BOOK_TO_LIST, REMOVE_BOOK_FROM_LIST } from "../utils/mutations"
import './AddToListButton.sass'
import BookImage from "./BookImage"
import { useMutationCB } from '../hooks/useMutationCB';

const AddToListButton = ({ book }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const [profile, updateProfile] = useProfile()
  const addBook = useMutationCB('addBookToList', ADD_BOOK_TO_LIST, (list) => {
    updateProfile('UPDATE_LIST', list)
  })
  const removeBook = useMutationCB('removeBookFromList', REMOVE_BOOK_FROM_LIST, (list) => {
    updateProfile('UPDATE_LIST', list)
  })

  const [lists, setLists] = useState([])
  useEffect(() => {
    if (profile.lists) setLists(profile.lists)
  }, [profile, profile.lists])

  const { volumeInfo: { title, authors } } = book

  const listHasBook = (list) => list.books.find(({ googleId }) => googleId === book.id) !== undefined

  const handleClick = async (list) => {
    listHasBook(list)
      ? removeBook({
        variables: { listId: list._id, bookId: book.id }
      }) : addBook({
        variables: { listId: list._id, book: bookData(book) }
      })
  }

  const BookListItem = ({ list }) => {
    const [hasBook, setHasBook] = useState(listHasBook(list))
    useEffect(() => {
      setHasBook(listHasBook(list))
    }, [list])
    return <List.Item content={list.name} onClick={() => handleClick(list)} icon={hasBook ? 'checkmark' : 'plus'} />
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon='plus' content="Add To List" />}
    >
      <Modal.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <BookImage book={book} />
            </Grid.Column>
            <Grid.Column width={13}>
              <Modal.Header>
                <Header as='h3' content={title} subheader={`By ${authors.join(', ')}`} />
              </Modal.Header>
              <Modal.Description>
                <List className="clickable" divided>
                  <List.Header content="Your Lists" />
                  {lists.map((list, i) => <BookListItem key={i} list={list} />)}
                  {/* {lists.map((list, i) => <List.Item onClick={() => addBook(list._id)} key={i} icon={alreadySaved(list) ? "checkmark" : "plus"} content={list.name} />)} */}
                </List>
                <Button.Group>
                  {/* <Link to="/lists/new" state={{ book }}> */}
                  <Button primary content='Add to New List' onClick={() => navigate(`/lists/new`, { state: { book } })} />
                  {/* </Link> */}
                  <Button content="Close" onClick={() => setOpen(false)} />
                </Button.Group>

              </Modal.Description>

            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Modal.Content>
    </Modal>
  )
}

export default AddToListButton