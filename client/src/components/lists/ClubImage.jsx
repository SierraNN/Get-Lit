import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Image, Placeholder } from "semantic-ui-react"
import { imgList } from "../ProfileImage"


const ClubImage = ({ info }) => {
  const [club, setClub] = useState(null)

  useEffect(() => {
    setClub(info)
  }, [info])

  if (!club) return <Placeholder.Image />
  const { _id, name, books = [], lists = [], members = [] } = club

  const thumbnail = null

  const renderImage = () => {
    const memberSprites = members.slice(0, 2).map(({ spriteChoice }) => imgList[spriteChoice])
    const bookImages = books.slice(0, 2).map(({ thumbnail }) => thumbnail)
    const thumbnails = [...memberSprites, ...bookImages]
    // console.log(thumbnails, { members, books })
    return thumbnails.length > 0 ? (
      <div className="multiThumbnail">
        {thumbnails.map((url, i) => <Image size={thumbnails.length > 1 ? 'tiny' : undefined} key={i} src={url} />)}
      </div>
    ) : (
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

  }

  return (
    <Link to={`/clubs/${_id}`} className={thumbnail ? 'item' : 'item   placeholder'}>
      <Header as='h3' content={name} />
      {renderImage()}
    </Link>

  )
}

export default ClubImage