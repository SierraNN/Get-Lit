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

const ReviewDetails = (props) => {
  const { reviewId } = useParams()
  const [profile, updateProfile] = useProfile()
  const { Form } = useForm()
  const { data, refetch } = useQuery(GET_REVIEW, {
    variables: { id: reviewId }
  })
  const review = data?.getReview || null

  const [addCommentToReview] = useMutation(ADD_COMMENT_TO_REVIEW)

  useEffect(() => {
    if (reviewId) refetch()
  }, [reviewId, profile.reviews])

  if (!review) return <Loading message="Retrieving review" />
  const isCreator = review.creator._id === profile._id
  const { description, book, comments, creator } = review

  const onSubmit = async ({ text }) => {
    const { data } = await addCommentToReview({
      variables: {
        reviewId,
        comment: text
      }
    })
    if (data && data.addCommentToReview) {
      updateProfile('UPDATE_LIST', { ...review, comment: data.addCommentToReview })
    }
    return { data }
  }

  return (
    <Container className="ui container1 background3">
      <Header as='h1' content={book?.title} subheader={"Review - " + creator.username} />
      <Segment>
        <Header>Description</Header>
        {description}
        <Label.Group>
          {book?.tags.map(({ text }, i) => <Label key={i} content={text} />)}
        </Label.Group>
      </Segment>
      <Segment>
        <List>
          {review.comments.map((comment, i) => <List.Item key={i} >
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
  )
}

export default ReviewDetails