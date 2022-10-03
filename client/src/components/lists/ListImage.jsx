import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Image, Placeholder } from "semantic-ui-react"
import UserLabel from "../UserLabel"

const ListImage = ({ info }) => {
  const [list, setList] = useState({})

  useEffect(() => {
    setList(info)
  }, [info])

  if (!info) return <Placeholder.Image />
  const { _id, name, books, creator } = list

  const renderImage = () => {
    const thumbnails = books ? books.slice(0, 4).map(({ thumbnail }) => thumbnail) : null
    return thumbnails ? (
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
    <Link to={`/lists/${_id}`} className="item">
      <Header as="h3" content={name} />
      <UserLabel user={creator} />
      {renderImage()}
    </Link>

  )
}

export default ListImage