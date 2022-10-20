import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { Link, useLocation } from "react-router-dom"
import { Button, Header, Label, List, Message } from "semantic-ui-react"
import { useAuth } from "../../context/AuthContext"
import CommentForm from "../forms/CommentForm"
import UserLabel from "../UserLabel"
import AppHeader from "./AppHeader"
import Comment from "./Comment"

const CommentList = ({
  list,
  header,
  onEdit,
  onDelete,
  parents = {},
  noCommentLabel = 'No comments yet',
  ...formProps
}) => {
  const [auth] = useAuth()
  const location = useLocation()

  return (
    <>
      <AppHeader content={header} />
      {auth ? (
        <>
          <List className="comment-list" relaxed divided>
            {list && list.length ? list.map((comment, i) => <Comment key={i} parents={parents} onEdit={onEdit} onDelete={onDelete} comment={comment} />) : (<List.Item content={<Header content={noCommentLabel} />} />)}
          </List>
          <FormProvider>
            <CommentForm {...formProps} />
          </FormProvider>
        </>
      ) : (<Message positive>
        Must be logged in to view
        <Link to="/login" state={{ from: location.pathname }}>
          <Button className="margin-left-1" color="green" content="Log In" />
        </Link>
      </Message>)}

    </>
  )
}

export default CommentList