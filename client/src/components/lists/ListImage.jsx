import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Image, Placeholder } from "semantic-ui-react"
import bookLists from "../../utils/bookLists"

const ListImage = ({ list }) => {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    setInfo(list) 
  }, [list])

  if (!info) return <Placeholder.Image />
  const { _id, name, books } = info

  //const { thumbnail } = imageLinks || {}
  const {thumbnail=null} = books[0] || {}
  return (
    <Link to={`/lists/${_id}`} className={thumbnail ? 'item' : 'item   placeholder'}>
      {thumbnail
        ?
        <> <Header as='h3'>{name}</Header>
        <Image src={thumbnail} inline onClick={() => bookLists.recent.updateById(list._id, list)} />
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

export default ListImage