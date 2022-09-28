import { Icon, Rating } from "semantic-ui-react"
import { useProfile } from "../../context/ProfileContext"

const RatingStars = ({ review }) => {
  const { rating } = review
  // console.log({ review, rating })
  return (
    <Rating icon='star' disabled={true} rating={rating} maxRating={10} />
  )
}

export default RatingStars