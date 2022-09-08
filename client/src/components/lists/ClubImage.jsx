import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Image, Placeholder } from "semantic-ui-react"
import clubCache from "../../utils/clubs"

const ClubImage = ({ club }) => {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    setInfo(club) 
  }, [club])

  if (!info) return <Placeholder.Image />
  const { _id, name, books } = info

const thumbnail = null

  return (
    <Link to={`/clubs/${_id}`} className={thumbnail ? 'item' : 'item   placeholder'}>
      {thumbnail
        ?
        <> <Header as='h3'>{name}</Header>
        <Image src={thumbnail} inline onClick={() => clubCache.recent.updateById(club._id, club)}/>
        </>
        : <>
          <Header as='h3'>{name}</Header>
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
        </>
      }

    </Link>

  )
}

export default ClubImage