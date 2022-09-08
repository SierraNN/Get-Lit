import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Image, Label, Placeholder } from "semantic-ui-react"
import reviewCache from "../../utils/reviews"

const ReviewImage = ({ review }) => {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    setInfo(review)
  }, [review])

  if (!info) return <Placeholder.Image />
  const { _id, book, creator } = info
  // console.log('REVIEW', info)

  const renderBookThumbnail = () => {
    const thumbnail = book?.thumbnail || null
    if (!thumbnail) return (
      <Placeholder>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    )
    else return (
      <Image src={thumbnail} />
    )
  }
  const imgList = [
    "/assets/bg/a.jpg",
    "/assets/bg/b.png",
    "/assets/bg/e.png",
    "/assets/bg/f.png",
    "/assets/bg/g.png",
  ]
  const renderUserIcon = () => {
    let sprite = creator?.spriteChoice || null
    return sprite !== null && <Label className="creatorLabel">
      <Image src={imgList[sprite]} className="labelSprite " circular bordered />
      <Label.Detail content={creator?.username} />
    </Label>
  }

  return (
    <Link to={`/reviews/${_id}`} className="item">
      <div onClick={() => reviewCache.recent.updateById(review._id, review)} >
        <Header as="h3" content={book?.title} />
        {renderBookThumbnail()}
        {renderUserIcon()}
      </div>

    </Link>

  )
}

export default ReviewImage