import { Icon, Rating } from "semantic-ui-react"
import { useProfile } from "../../context/ProfileContext"

const RatingStars = ({ review, onRate }) => {
  const { rating, creator } = review
  return (
    <Rating icon='star' disabled={true} rating={rating} maxRating={10} />
  )
}

export default RatingStars