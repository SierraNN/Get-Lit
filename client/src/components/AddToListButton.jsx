import { useMutation } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Grid, Header, List, Modal } from "semantic-ui-react"
import { useProfile } from "../context/ProfileContext"
import bookData from "../utils/bookData"
import { ADD_BOOK_TO_LIST } from "../utils/mutations"
import './AddToListButton.sass'
import BookImage from "./BookImage"

const AddToListButton = ({ book }) => {
  const [open, setOpen] = useState(false)

  const [profile, updateProfile] = useProfile()
  const [addBookToList] = useMutation(ADD_BOOK_TO_LIST)

  const [lists, setLists] = useState([])
  useEffect(() => {
    setLists(profile.lists || [])
  }, [profile, profile.lists])

  const { volumeInfo: { title, authors } } = book

  const addBook = async (listId) => {
    const { data } = await addBookToList({
      variables: {
        listId,
        book: bookData(book)
      }
    })
    if (data && data.addBookToList) {
      const list = data.addBookToList
      updateProfile("UPDATE_LIST", list)

    }
  }
  const alreadySaved = (list) => {
    const foundList = profile.lists && profile.lists.find(({ _id }) => list._id === _id)
    if (!foundList.books) return false
    return foundList.books.find(({ googleId }) => googleId === book.id) !== undefined
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
                <Header content={title} subheader={`By ${authors.join(', ')}`} />
              </Modal.Header>
              <Modal.Description>
                <List className="clickable">
                  <List.Header content="Pick a list" />
                  {lists.map((list, i) => <List.Item onClick={() => addBook(list._id)} key={i} icon={alreadySaved(list) ? "checkmark" : "plus"} content={list.name} />)}
                </List>
                <Link to="/lists/new" state={{ book }}>
                  <Button content='Create a New List' />
                </Link>
              </Modal.Description>

            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Modal.Content>
    </Modal>
  )
}

export default AddToListButton