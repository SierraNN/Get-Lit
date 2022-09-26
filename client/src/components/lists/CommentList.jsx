import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { Link, useLocation } from "react-router-dom"
import { Button, Header, Label, List, Message } from "semantic-ui-react"
import { useAuth } from "../../context/AuthContext"
import UserLabel from "../UserLabel"
import Comment from "./Comment"

const CommentList = ({
  list,
  header,
  userCanPost = false,
  disabledMessage,
  onSubmit,
  onEdit,
  onDelete,
  parents = {},
  textAreaLabel = "Add a Comment",
  noCommentLabel = 'No comments yet'
}) => {
  const [auth] = useAuth()
  const { Form, clearData } = useForm()
  const location = useLocation()
  const CommentHeader = () => {
    if (typeof header === 'string') {
      return <Header as='h3' content={header} />
    } else {
      return header
    }
  }

  return (
    <>
      <CommentHeader />
      {auth ? (
        <>
          <List className="comment-list" relaxed divided>
            {list && list.length ? list.map((comment, i) => <Comment key={i} parents={parents} onEdit={onEdit} onDelete={onDelete} comment={comment} />) : (<List.Item content={<Header content={noCommentLabel} />} />)}
          </List>
          {userCanPost ? <FormProvider>
            <Form submit={onSubmit} respond={() => { clearData(); console.log('clear') }} fields={[
              { name: "text", label: textAreaLabel, control: "textarea", required: true }
            ]} />
          </FormProvider> : disabledMessage}
        </>
      ) : (<Message positive>
        Must be logged in to view posts
        <Link to="/login" state={{ from: location.pathname }}>
          <Button className="margin-left-1" color="green" content="Log In" />
        </Link>
      </Message>)}

    </>
  )
}

export default CommentList