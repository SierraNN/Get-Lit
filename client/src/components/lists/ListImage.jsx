import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Image, Placeholder } from "semantic-ui-react"
import listCache from "../../utils/listCache"

const ListImage = ({ list }) => {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    setInfo(list)
  }, [list])

  if (!info) return <Placeholder.Image />
  const { _id, name, books } = info

  // const { thumbnail = null } = books[0] || {}

  const renderImage = () => {
    const thumbnails = books ? books.slice(0, 3).map(({ thumbnail }) => thumbnail) : null
    console.log('BOOKS', { books })
    let size
    switch (thumbnails.length) {
      case 2:
        size = 'medium'
      case 3:
        size = 'small'
      case 4:
        size = 'tiny'
    }
    if (!thumbnails) return (
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
      <div className="listThumbnails">
        {thumbnails.map((url, i) => <Image size={size} key={i} src={url} />)}
      </div>
    )
  }

  return (
    <Link to={`/lists/${_id}`} className="item">
      <div onClick={() => listCache.recent.updateById(list._id, list)} >
        <Header as="h3" content={name} />
        {renderImage()}
      </div>

    </Link>

  )
}

export default ListImage