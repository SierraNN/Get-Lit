import { Button, Item, List } from "semantic-ui-react"
import { useProfile } from "../../context/ProfileContext"
import UserLabel from "../UserLabel"

const Comment = ({ comment }) => {
  const [profile, updateProfile] = useProfile()
  const isOwnComment = profile?._id === comment.author?._id
  return (
    <List.Item className="comment">
      <Item.Content>{comment.text}</Item.Content>
      <UserLabel user={comment.author} detail={comment.createdAt} />
      {isOwnComment && <Button.Group compact className="comment-buttons">
        <Button icon="edit" basic color='grey' />
        <Button icon="trash" basic color="red" />
      </Button.Group>}
    </List.Item>
  )
}

export default Comment