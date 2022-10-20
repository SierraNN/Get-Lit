import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Container, Header, Image, Label, Segment, Tab } from "semantic-ui-react"
import { useAuth } from '../context/AuthContext';
import Loading from "../components/Loading"
import { sanitizeHtml } from "../utils/sanitizeHtml"
import BookActions from "../components/auth-buttons/BookActions"
import BookService from "../context/BookService"
import { useFetch } from "../context/SearchContext"
import ReviewList from '../components/lists/ReviewList';
import RatingStars from "../components/forms/RatingStars"

const BookDetails = (props) => {
  const [auth] = useAuth()
  const { bookId } = useParams()
  const [googleInfo, setGoogleInfo] = useState(null)
  const [appInfo, setAppInfo] = useState({})
  const { book } = useFetch()

  useEffect(() => {
    let googleSubcription = BookService.googleData.subscribe(data => setGoogleInfo(data))
    let appSubscription = book.observable.subscribe(data => setAppInfo(data))
    BookService.setBook(bookId, book)
    return () => {
      googleSubcription.unsubscribe()
      appSubscription.unsubscribe()
    }
  }, [bookId])

  if (!googleInfo) return <Loading message="Getting Book" />
  const { volumeInfo } = googleInfo
  const { reviews = [], clubs = [], lists = [] } = appInfo

  const panes = [
    {
      menuItem: 'Description',
      render: () => <Tab.Pane attached={false}><div dangerouslySetInnerHTML={{ __html: sanitizeHtml(volumeInfo.description) }}></div></Tab.Pane>,
    },
    {
      menuItem: 'Reviews',
      render: () => (
        <Tab.Pane key="reviews" attached={false}>
          <Link to={`reviews/new`}>
            <Button floated="right" icon="plus" color="green" content="Write a Review" />
          </Link>
          <ReviewList list={reviews} emptyMessage="No reviews found" />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Book Lists',
      render: () => (
        <Tab.Pane key="lists" attached={false}>
          <Link to={`lists/new`} state={{ book: googleInfo }}>
            <Button floated="right" icon="plus" color="green" content="Write a Review" />
          </Link>
          <ReviewList list={reviews} emptyMessage="No reviews found" />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Book Clubs',
      render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>,
    },
  ]

  return (
    <div className="background3">
      <Container className="ui blue-box">
        <Header as='h1' content={volumeInfo.title} subheader={`By ${volumeInfo.authors.join(', ')}`} />
        <Segment basic className="flex">
          <Image inline src={volumeInfo?.imageLinks?.thumbnail} />
          <div className="stretch">
            <Header content="Categories" />
            <Label.Group>
              {volumeInfo.categories && volumeInfo.categories.map((cat, i) => <Label key={i} content={cat} />)}
            </Label.Group>
          </div>
          {auth && <BookActions book={googleInfo} />}
        </Segment>
        <Segment>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Segment>

      </Container>

    </div>
  )
}

export default BookDetails