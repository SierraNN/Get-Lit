import { useMutation } from "@apollo/client"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { useEffect } from "react";
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Header, Segment, TextArea } from "semantic-ui-react"
import bookCache from "../../utils/books";
import { useProfile } from "../../context/ProfileContext";
import { CREATE_REVIEW } from '../../utils/mutations';

const CreateReview = (props) => {
  const { Form } = useForm()
  const [profile, updateProfile] = useProfile()
  const navigate = useNavigate()
  const [createReview] = useMutation(CREATE_REVIEW)
  const [book, setBook] = useState()
  const { bookId } = useParams()

  useEffect(() => {
    setBook(bookCache.recent.getById(bookId))
  }, [bookId])

  const onSubmit = async (reviewInfo) => {
    const review = { ...reviewInfo }
    if (review.tags === '') review.tags = []
    else review.tags = review.tags.split(',')
    return createReview({
      variables: { review }
    })
  }
  const onResponse = async ({ data }) => {
    console.log(data.createReview)
    if (data?.createReview) {
      updateProfile('ADD_REVIEW', data.createReview)
      navigate(`/reviews/${data.createReview._id}`)
    }
  }



  return (
    <div className="background3">
      <Container className="container1">
        <FormProvider>
          <Header as='h1' content={book?.title} subheader="New Review" />
          <Form submit={onSubmit} respond={onResponse} fields={[
            { name: 'name', required: true },
            { name: 'reviewText', control: TextArea },
            { name: 'tags', label: 'Tags (comma separated)' }
          ]} submitBtnText="Publish Review" />
        </FormProvider>

      </Container>

    </div>
  )
}

export default CreateReview