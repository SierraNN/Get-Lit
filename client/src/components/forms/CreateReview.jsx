import { useMutation } from "@apollo/client"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect } from "react";
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Accordion, Container, Header, Icon, Image, Rating, Segment, TextArea } from "semantic-ui-react"
import bookCache from "../../utils/bookCache";
import { useProfile } from "../../context/ProfileContext";
import { CREATE_REVIEW } from '../../utils/mutations';
import BookQuickFind from "../BookQuickFind";
import BookImage from "../BookImage";
import bookData from '../../utils/bookData';
import { sanitizeHtml } from "../../utils/sanitizeHtml";
import { bookByGoogleId } from "../../utils/google";
import { useFetch } from "../../context/SearchContext";
import BookService from "../../context/BookService";
import Loading from "../Loading";
import RatingStars from "./RatingStars";

const CreateReview = (props) => {
  const { Form } = useForm()
  const [profile, updateProfile] = useProfile()
  const navigate = useNavigate()
  const [createReview] = useMutation(CREATE_REVIEW)
  const [info, setInfo] = useState(null)
  const { bookId } = useParams()
  const [showDescription, setShowDescription] = useState(false)

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
  useEffect(() => {
    console.log({ appInfo })
  }, [appInfo])

  if (!googleInfo) return <Loading message="Getting Book" />


  const onSubmit = async (reviewInfo) => {
    const review = { ...reviewInfo }
    if (review.rating !== '') review.rating = Number(review.rating)
    review.book = bookData(book)
    console.log('create review sumbit', { review })
    return createReview({
      variables: { review }
    })
  }
  const onResponse = async ({ data }) => {
    console.log('create review response', { data })
    if (data?.createReview) {
      updateProfile('ADD_REVIEW', data.createReview)
      navigate(`/reviews/${data.createReview._id}`)
    }
  }

  const handleClick = (book) => {
    navigate(`/books/${book.id}/reviews/new`)
  }

  const Rating = () => appInfo?.averageRating && <RatingStars average={appInfo?.averageRating} />

  const renderForm = () => {
    const { id, volumeInfo: { title, description, authors } } = googleInfo

    return <>
      <Header as='h2'>
        <BookImage book={googleInfo} action={null} />
        <Header.Content>
          {title}
          {authors && <Header.Subheader content={'By ' + authors.join(', ')} />}
          <Rating />
        </Header.Content>
      </Header>
      <Segment >
        <div className={showDescription ? 'active slide-down' : 'slide-down'}>
          <Header as='h3'
            icon='angle right'
            content="Book Description"
            onClick={() => setShowDescription(!showDescription)} />
          {showDescription && <p className="slide-down-content" dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}></p>}
        </div>
      </Segment>
      <Form submit={onSubmit} respond={onResponse} fields={[
        { name: 'rating', label: 'Rating', control: Rating, maxRating: 5 },
        { name: 'reviewTitle', label: 'Review Title', required: true },
        { name: 'reviewText', label: 'Your Review', control: TextArea, required: true },
      ]} submitBtnText="Publish Review" />
    </>
  }

  return (
    <div className="background3">
      <Container className="blue-box">
        <FormProvider>
          <Header as='h1' content='New Review' className="clickable" />
          {book
            ? renderForm()
            : <BookQuickFind onBookClick={handleClick} />}

        </FormProvider>

      </Container>

    </div>
  )
}

export default CreateReview