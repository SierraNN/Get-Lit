import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Grid, Header, List, Modal } from "semantic-ui-react"
import { useProfile } from "../../context/ProfileContext"
import bookData from "../../utils/bookData"
import { ADD_BOOK_TO_CLUB, REMOVE_BOOK_FROM_CLUB } from "../../utils/mutations"
// import './AddBookToListButton.sass'
import BookImage from "../BookImage"
import { useMutationCB } from '../../hooks/useMutationCB';

const AddBookToClubButton = ({ book }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const [profile, updateProfile] = useProfile()
  const addBook = useMutationCB('addBookToClub', ADD_BOOK_TO_CLUB, (list) => {
    updateProfile('UPDATE_CLUB', list)
  })
  const removeBook = useMutationCB('removeBookFromClub', REMOVE_BOOK_FROM_CLUB, (list) => {
    updateProfile('UPDATE_CLUB', list)
  })

  const [clubs, setClubs] = useState([])
  useEffect(() => {
    if (profile.clubs) setClubs(profile.clubs)
  }, [profile, profile.clubs])

  const { volumeInfo: { title, authors } } = book

  const clubHasBook = (club) => club.books.find(({ googleId }) => googleId === book.id) !== undefined

  const handleClick = async (club) => {
    console.log(club)
    clubHasBook(club)
      ? removeBook({
        variables: { clubId: club._id, bookId: book.id }
      }) : addBook({
        variables: { clubId: club._id, book: bookData(book) }
      })
  }

  const ClubListItem = ({ club }) => {
    const [hasBook, setHasBook] = useState(clubHasBook(club))
    useEffect(() => {
      setHasBook(clubHasBook(club))
    }, [club])
    return <List.Item content={club.name} onClick={() => handleClick(club)} icon={hasBook ? 'checkmark' : 'plus'} />
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button icon='users' content="Your Clubs" />}
    >
      <Modal.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <BookImage book={book} />
            </Grid.Column>
            <Grid.Column width={13}>
              {/* <Modal.Header> */}
              <Header as='h3' content={title} subheader={`By ${authors.join(', ')}`} />
              {/* </Modal.Header> */}
              {/* <Modal.Description> */}
              <List className="clickable" divided>
                <List.Header content="Clubs You Created" />
                {clubs.filter((club, i) => club.creator._id === profile._id).map((club, i) => <ClubListItem key={i} club={club} />)}
              </List>
              <Button.Group>
                {/* <Link to="/lists/new" state={{ book }}> */}
                <Button primary content='Add to New Club' onClick={() => navigate(`/clubs/new`, { state: { book } })} />
                {/* </Link> */}
                <Button content="Close" onClick={() => setOpen(false)} />
              </Button.Group>

              {/* </Modal.Description> */}

            </Grid.Column>
          </Grid.Row>
        </Grid>

      </Modal.Content>
    </Modal>
  )
}

export default AddBookToClubButton