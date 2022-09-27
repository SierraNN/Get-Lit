import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Header, Segment } from "semantic-ui-react"
import Loading from "../components/Loading"
import { useProfile } from "../context/ProfileContext"
import { ADD_COMMENT_TO_REVIEW, EDIT_REVIEW_COMMENT, REMOVE_REVIEW_COMMENT } from '../utils/mutations';
import BookImage from "../components/BookImage"
import UserAvatar from "../components/UserAvatar"
import { useMutationCB } from "../hooks/useMutationCB"
import { useFetch } from "../context/SearchContext"
import CommentList from "../components/lists/CommentList"

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

  const { reviewTitle, reviewText, rating, book, creator, comments } = reviewInfo
  const isCreator = reviewInfo.creator._id === profile._id
  if (!book) return <Loading message="Retrieving book info" />

  const submitComment = async ({ text }) => {
    return await createComment({ variables: { reviewId, comment: text } })
  }
  const onEdit = async (data) => {
    const update = await editComment({ variables: data })
    if (update) {
      updateReview({ comments: comments.map((comment) => comment._id === data.commentId ? { ...comment, text: data.text } : comment) })
    }
    return update
  }
  const onDelete = async (data) => {
    const update = await deleteComment({ variables: data })
    if (update) updateReview({ comments: comments.filter(({ _id }) => _id !== data.commentId) })
  }

  // const onSubmit = async ({ text }) => {
  //   const { data } = await addCommentToReview({
  //     variables: {
  //       reviewId,
  //       comment: text
  //     }
  //   })
  //   if (data && data.addCommentToReview) {
  //     setComments(data.addCommentToReview)
  //   }
  //   return { data }
  // }

  return (
    <div className="background3">
      <Container className="container1 ">
        <Header as='h1' content={book.title} />
        <Header as='h2'>
          <BookImage book={book} />
          <Header.Content>
            {reviewTitle}
            <Header.Subheader content={"Review by " + creator.username} />
            <UserAvatar user={creator} size="tiny" />
          </Header.Content>
        </Header>
        <Segment>
          {reviewText}
        </Segment>
        <Segment>
          <CommentList
            parents={{ reviewId }}
            header={<Header as='h2' content="Comments" />}
            onSubmit={submitComment}
            onEdit={onEdit}
            onDelete={onDelete}
            list={comments}
            noCommentLabel="No comments yet"
            textAreaLabel="Comment on this review" />
        </Segment>
      </Container>
    </div>
  )
}

export default ReviewDetails