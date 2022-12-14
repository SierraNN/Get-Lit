import { Image } from "semantic-ui-react"
import { imgList } from "./ProfileImage"

const UserAvatar = ({ user, ...imageProps }) => {
  // console.log({ user })
  let sprite = user?.spriteChoice || null
  return sprite !== null && <Image src={imgList[sprite]} className="labelSprite" {...imageProps} />
}

export default UserAvatar