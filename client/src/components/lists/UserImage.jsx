import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Image, List, Placeholder } from "semantic-ui-react"
import userCache from "../../utils/users"

import { imgList } from "../ProfileImage"

const UserImage = ({ user }) => {
  const [info, setInfo] = useState(null)
  const [thumbnail, setThumbnail] = useState(imgList[0])

  useEffect(() => {
    setInfo(user)
    if (user) setThumbnail(imgList[user.spriteChoice])
  }, [user])

  if (!info) return <Placeholder className='item'><Placeholder.Image /></Placeholder>
  const { _id, username, spriteChoice = 0 } = info
  return (
    <Link to={`/users/${_id}`} className={thumbnail ? 'item' : 'item   placeholder'}>
      {thumbnail
        ?
        <>
          <Header as='h3'>{username}</Header>
          <Image src={thumbnail} inline onClick={() => userCache.recent.updateById(user._id, user)} />
        </>
        : <>
          <Header as='h3'>{username}</Header>
          <Placeholder>
            <Placeholder.Image>
            </Placeholder.Image>
          </Placeholder>
        </>
      }

    </Link>

  )
}

export default UserImage