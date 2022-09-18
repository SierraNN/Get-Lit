import { useMutation, useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button, Container, Header, Label, List, Segment } from "semantic-ui-react"
import Loading from "../components/Loading"
import { useProfile } from "../context/ProfileContext"
import { GET_REVIEW } from "../utils/queries"
import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { ADD_COMMENT_TO_REVIEW } from '../utils/mutations';
import BookImage from "../components/BookImage"
import BookLink from "../components/BookLink"

const ReviewDetails = (props) => {
  const { reviewId, bookId } = useParams()
  const [profile, updateProfile] = useProfile()
  const { Form } = useForm()
  const { data, refetch } = useQuery(GET_REVIEW, {
    variables: { id: reviewId }
  })
  const review = data?.getReview || null
  const [comments, setComments] = useState([])

  const [addCommentToReview] = useMutation(ADD_COMMENT_TO_REVIEW)

  useEffect(() => {
    if (reviewId) refetch()
  }, [reviewId, profile.reviews])
  useEffect(() => {
    setComments(review?.comments || [])
  }, [review])

  if (!review) return <Loading message="Retrieving review" />
  const isCreator = review.creator._id === profile._id
  const { reviewTitle, reviewText, rating, book, creator } = review
  if (!book) return <Loading message="Retrieving book info" />

  const onSubmit = async ({ text }) => {
    const { data } = await addCommentToReview({
      variables: {
        reviewId,
        comment: text
      }
    })
    if (data && data.addCommentToReview) {
      setComments(data.addCommentToReview)
    }
    return { data }
  }

  return (
    <div className="background3">
      <Container className="container1 ">
        <Header as='h1' content={book.title} />
        <BookLink book={book} />
        <Header as='h2' content={reviewTitle} subheader={"Review by " + creator.username} />

        <Segment>
          {reviewText}
        </Segment>
        <Segment>
          <Header as='h2' content="Comments" />
          <List className="comment-list">
            {comments.map((comment, i) => <List.Item key={i} >
              {comment.text}<Label content={comment.author.username} detail={comment.createdAt} />
            </List.Item>)}
          </List>

          <FormProvider>
            <Form submit={onSubmit} fields={[
              { name: "text", label: 'Comment on this review:', control: "textarea", required: true }
            ]} />
          </FormProvider>
        </Segment>
      </Container>
    </div>
  )
}

export default ReviewDetails