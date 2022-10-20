import { Label, Popup, Rating } from "semantic-ui-react"

const RatingStars = ({ popup = "bottom center", review, average, ...ratingProps }) => {
  if (!review && !average) throw new Error('Rating not provided')
  const rating = review?.rating || average
  let label = average ? `${rating} star average` : `${rating} stars`
  // if (average) label += ' average'
  // const label = <Label content={average ? `${rating} average` : rating} detail="/ 10" />
  return (
    <Popup className="rating" content={<Label content={label} detail="/ 5" />} position={popup} trigger={<Rating icon='star' disabled={true} rating={rating} maxRating={5} {...ratingProps} />} />
  )
}

export default RatingStars