import { useState } from "react"
import { Button, Form, Item, List, Message, TextArea } from "semantic-ui-react"
import { useProfile } from "../../context/ProfileContext"
import UserLabel from "../UserLabel"

const Comment = ({ comment, parents, onEdit, onDelete }) => {
  const [profile, updateProfile] = useProfile()
  const isOwnComment = profile?._id === comment.author?._id
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(comment.text)
  const [error, setError] = useState(null)
  const handleEdit = async () => {
    let update = await onEdit({ ...parents, commentId: comment._id, text: value })
    if (update) setIsEditing(false)
    else {
      setError('Error.. did not save')
    }
  }
  const handleDelete = async () => {
    let update = await onDelete({ ...parents, commentId: comment._id })
  }
  return (
    <List.Item className="comment">
      <Item.Content>
        {isEditing ? <>
          <Form error={error !== null}>
            <Form.Field value={value} onChange={(ev, data) => setValue(data.value)} control={TextArea} />
            <Button.Group compact vertical className="comment-buttons in-edit">
              <Button basic icon="checkmark" color="green" onClick={handleEdit} />
              <Button basic icon="x" color="red" onClick={() => setIsEditing(false)} />
            </Button.Group>
            <Message onDismiss={() => setError(null)} className="update-error" error content={error} />
          </Form>
        </> : comment.text}

      </Item.Content>
      <UserLabel user={comment.author} detail={comment.createdAt} />
      {isOwnComment && <Button.Group compact className="comment-buttons">
        <Button icon='edit' basic color='grey' onClick={() => setIsEditing(!isEditing)} />
        <Button icon="trash" basic color="red" onClick={handleDelete} />
      </Button.Group>}
    </List.Item>
  )
}

export default Comment