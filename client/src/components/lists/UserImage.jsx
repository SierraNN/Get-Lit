import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Icon, Image, Label, List, Placeholder } from "semantic-ui-react"
import { useProfile } from "../../context/ProfileContext"
import userCache from "../../utils/userCache"

import { imgList } from "../ProfileImage"

const UserImage = ({ user }) => {
  const [profile] = useProfile()
  const [userInfo, setUserInfo] = useState(null)
  const [thumbnail, setThumbnail] = useState(imgList[0])
  const [isFollowing, setIsFollowing] = useState((profile?.following || []).find(({ _id }) => _id === userInfo?._id) !== undefined)

  useEffect(() => {
    setUserInfo({ ...user })
    if (user) setThumbnail(imgList[user.spriteChoice])
  }, [user])

  useEffect(() => {
    if (userInfo?._id) setIsFollowing((profile.following || []).find(({ _id }) => _id === userInfo._id) !== undefined)
  }, [userInfo, profile, profile.following])

  if (!userInfo) return <Placeholder className='item'><Placeholder.Image /></Placeholder>

  const { _id, username } = userInfo
  if (!username) console.log(username, { user, userInfo })



  return (
    <Link to={`/users/${_id}`} className={thumbnail ? 'item' : 'item placeholder'}>
      <Header as='h3'>{username}{isFollowing && <Icon className="followingIcon" size="small" name='heart' />}</Header>
      {thumbnail
        ? <Image src={thumbnail} onClick={() => userCache.recent.updateById(user._id, user)} />
        : <Placeholder>
          <Placeholder.Image>
          </Placeholder.Image>
        </Placeholder>

      }

    </Link>

  )
}

export default UserImage