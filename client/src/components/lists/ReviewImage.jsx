import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Placeholder } from "semantic-ui-react"
import reviewCache from "../../utils/reviewCache"
// import { imgList } from '../ProfileImage';
import BookImage from "../BookImage"
import UserLabel from "../UserLabel"

const ReviewImage = ({ info }) => {
  const [review, setReview] = useState(null)

  useEffect(() => {
    if (info && info.book) {
      setReview(info)
    }
  }, [info])

  if (!review) {
    return <Placeholder.Image />
  }
  const { _id, book, creator, reviewTitle } = review

  return (
    <Link to={`/reviews/${_id}`} onClick={() => reviewCache.recent.updateById(review._id, review)} className="item">
      <Header as="h3" content={reviewTitle} />
      <BookImage book={book} />
      <UserLabel user={creator} />
    </Link>

  )
}

export default ReviewImage