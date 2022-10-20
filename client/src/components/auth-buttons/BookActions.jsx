import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "semantic-ui-react"
import { useProfile } from "../../context/ProfileContext"
import { useMutationCB } from "../../hooks/useMutationCB"
import bookData from "../../utils/bookData"
import { REMOVE_BOOK, SAVE_BOOK } from "../../utils/mutations"
import AddToListButton from "../AddToListButton"

const BookActions = ({ book }) => {
  const [profile, updateProfile] = useProfile()
  const [favoriteId, setFavoriteId] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (profile.books) {
      let found = profile.books.find(({ googleId }) => googleId === book.id)
      setFavoriteId(found ? found._id : false)
    }
  }, [profile])
  const addToFaves = useMutationCB('saveBook', SAVE_BOOK, (book) => {
    updateProfile('ADD_BOOK', book)
  })
  const removeFromFaves = useMutationCB('removeBook', REMOVE_BOOK, (book) => {
    updateProfile('REMOVE_BOOK', favoriteId)
  })
  const handleClick = () => {
    if (favoriteId) {
      removeFromFaves({
        variables: { bookId: favoriteId }
      })
    } else {
      addToFaves({
        variables: { book: bookData(book) }
      })
    }

  }
  return (
    <Button.Group vertical>
      {favoriteId
        ? <Button color='red' icon='trash' onClick={handleClick} content="Remove from Favorites" />
        : <Button color="blue" icon='save' onClick={handleClick} content="Save as Favorite" />}
      <AddToListButton book={book} />
      <Button color='teal' icon='pencil' content="Write a Review" onClick={() => navigate(`/books/${book.id}/reviews/new`)} />
    </Button.Group>
  )
}

export default BookActions