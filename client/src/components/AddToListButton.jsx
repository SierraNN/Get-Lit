import { useMutation } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Button, List, Modal } from "semantic-ui-react"
import { useProfile } from "../context/ProfileContext"
import bookData from "../utils/bookData"
import { ADD_BOOK_TO_LIST } from "../utils/mutations"
import './AddToListButton.sass'

const AddToListButton = ({ book }) => {
  const [open, setOpen] = useState(false)

  const [profile, updateProfile] = useProfile()
  const [addBookToList] = useMutation(ADD_BOOK_TO_LIST)

  const [lists, setLists] = useState([])
  useEffect(() => {
    setLists(profile.lists || [])
<<<<<<< HEAD
  }, [profile])
=======
  }, [profile, profile.lists])
>>>>>>> main

  const { volumeInfo: { title } } = book

  const addBook = async (listId) => {
    const { data } = await addBookToList({
      variables: {
        listId,
        book: bookData(book)
      }
    })
    if (data && data.addBookToList) {
      console.log(data)
<<<<<<< HEAD
    }
  }
=======
      const list = data.addBookToList
      updateProfile("UPDATE_LIST", list)

    }
  }
  const alreadySaved = (list) => {
    const foundList = profile.lists && profile.lists.find(({ _id }) => list._id === _id)
    return foundList.books.find(({ googleId }) => googleId === book.id) !== undefined
}
>>>>>>> main

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon='plus' content="Add To List" />}
    >
      <Modal.Content>
        <Modal.Header>
          {title}
          <br />
          Pick a list
        </Modal.Header>
        <Modal.Description>
          <List className="clickable">
<<<<<<< HEAD
            {lists.map((list, i) => <List.Item onClick={() => addBook(list._id)} key={i} icon="plus" content={list.name} />)}
=======
            {lists.map((list, i) => <List.Item onClick={() => addBook(list._id)} key={i} icon={alreadySaved(list)?"checkmark":"plus"} content={list.name} />)}
>>>>>>> main
          </List>
          <Link to="/lists/new" state={{ book }}>
            <Button content='Create a New List' />
          </Link>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default AddToListButton