import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Header, Rating, Segment } from "semantic-ui-react"
import Loading from "../components/Loading"
import { useProfile } from "../context/ProfileContext"
import { ADD_COMMENT_TO_REVIEW, EDIT_REVIEW_COMMENT, REMOVE_REVIEW_COMMENT } from '../utils/mutations';
import BookImage from "../components/BookImage"
import UserAvatar from "../components/UserAvatar"
import { useMutationCB } from "../hooks/useMutationCB"
import { useFetch } from "../context/SearchContext"
import CommentList from "../components/lists/CommentList"
import RatingStars from "../components/forms/RatingStars"
import AppHeader from "../components/lists/AppHeader"

const ReviewDetails = (props) => {
  const { reviewId } = useParams()
  const [profile, updateProfile] = useProfile()

  const { review } = useFetch()
  const [reviewInfo, setReviewInfo] = useState()

  const updateReview = (data) => {
    let update = { ...reviewInfo, ...data }
    setReviewInfo(update)
    review.updateCacheById(reviewId, update)
  }

  const createComment = useMutationCB('addCommentToReview', ADD_COMMENT_TO_REVIEW,
    comments => updateReview({ comments })
  )
  const editComment = useMutationCB('editReviewComment', EDIT_REVIEW_COMMENT, (update) => update)
  const deleteComment = useMutationCB('removeReviewComment', REMOVE_REVIEW_COMMENT, (update) => update)

  useEffect(() => {
    async function getReview(id) {
      let fetchedReview = await review.getById(id)
      setReviewInfo(fetchedReview)
    }
    if (reviewId) getReview(reviewId)
  }, [reviewId, profile.reviews])

  if (!reviewInfo) return <Loading message="Retrieving review" />

  const { reviewTitle, reviewText, book, creator, comments } = reviewInfo
  const isCreator = reviewInfo.creator._id === profile._id
  if (!book) return <Loading message="Retrieving book info" />

  const comment = {
    submit: async ({ text }) => {
      return await createComment({ variables: { reviewId, comment: text } })
    },
    edit: async (data) => {
      const update = await editComment({ variables: data })
      if (update) {
        updateReview({ comments: comments.map((comment) => comment._id === data.commentId ? { ...comment, text: data.text } : comment) })
      }
      return update
    },
    delete: async (data) => {
      const update = await deleteComment({ variables: data })
      if (update) updateReview({ comments: comments.filter(({ _id }) => _id !== data.commentId) })
    }
  }

  return (
    <div className="background3">
      <Container className="blue-box ">
        <Header as='h1'>
          <BookImage book={book} />
          <Header.Content>
            {book.title}
            <Header.Subheader content={`${book.ratingCount} Reviews`} />
            <RatingStars average={book.averageRating} />
          </Header.Content>
        </Header>
        <Segment>
          <Header as='h2'  >
            <UserAvatar user={creator} />
            <Header.Content>
              {reviewTitle}
              <Header.Subheader content={"Review by " + creator.username} />
              <RatingStars review={reviewInfo} />
            </Header.Content>
          </Header>
          <p>{reviewText}</p>
        </Segment>
        <Segment>
          <CommentList
            parents={{ reviewId }}
            header={<Header as='h2' content="Comments" />}
            onSubmit={comment.submit}
            onEdit={comment.edit}
            onDelete={comment.delete}
            list={comments}
            noCommentLabel="No comments yet"
            textAreaLabel="Comment on this review" />
        </Segment>
      </Container>
    </div>
  )
}

export default ReviewDetails