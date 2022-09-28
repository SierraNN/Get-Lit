import { useMutation } from "@apollo/client"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect } from "react";
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Header, Image, Segment, TextArea } from "semantic-ui-react"
import bookCache from "../../utils/bookCache";
import { useProfile } from "../../context/ProfileContext";
import { CREATE_REVIEW } from '../../utils/mutations';
import BookQuickFind from "../BookQuickFind";
import BookImage from "../BookImage";
import bookData from '../../utils/bookData';

const CreateReview = (props) => {
  const { Form } = useForm()
  const [profile, updateProfile] = useProfile()
  const navigate = useNavigate()
  const [createReview] = useMutation(CREATE_REVIEW)
  const [book, setBook] = useState(null)
  const { bookId } = useParams()

  useEffect(() => {
    if (bookId) setBook(bookCache.recent.getById(bookId))
  }, [bookId])

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

  const validateRating = (value) => {
    if (value === '') return true
    else {
      let num = Number(value)
      return num >= 0 && num <= 10
    }
  }

  const handleClick = (book) => {
    navigate(`/books/${book.id}/reviews/new`)
  }

  const renderForm = () => {
    const { id, volumeInfo: { title, description, authors } } = book

    return <>
      <Header as='h2' content={title} subheader={authors.join(', ')} image={<BookImage book={book} action={null} />} />
      <Segment >
        <Header as='h3' content="Book Description" />
        {description}
      </Segment>
      <Form submit={onSubmit} respond={onResponse} fields={[
        { name: 'reviewTitle', label: 'Review Title', required: true },
        { name: 'reviewText', label: 'Your Review', control: TextArea, required: true },
        { name: 'rating', label: 'Rating out of 10', type: 'number', width: '4', validators: [validateRating, 'Must be between 0 and 10'] }
      ]} submitBtnText="Publish Review" />
    </>
  }

  return (
    <div className="background3">
      <Container className="blue-box">
        <FormProvider>
          <Header as='h1' content='New Review' />
          {book
            ? renderForm()
            : <BookQuickFind onBookClick={handleClick} />}

        </FormProvider>

      </Container>

    </div>
  )
}

export default CreateReview