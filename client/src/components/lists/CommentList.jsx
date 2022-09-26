import { FormProvider, useForm } from "@codewizard-dt/use-form-hook"
import { Header, Label, List, Message } from "semantic-ui-react"
import UserLabel from "../UserLabel"
import Comment from "./Comment"

const CommentList = ({
  list,
  header,
  userCanPost = false,
  disabledMessage,
  onSubmit,
  textAreaLabel = "Add a Comment",
  noCommentLabel = 'No comments yet' }) => {
  const { Form, clearData } = useForm()
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
      <List className="comment-list" relaxed divided>
        {list ? list.map((comment, i) => <Comment key={i} comment={comment} />) : (<List.Item content={<Header content={noCommentLabel} />} />)}
      </List>

      {userCanPost ? <FormProvider>
        <Form submit={onSubmit} respond={clearData} fields={[
          { name: "text", label: textAreaLabel, control: "textarea", required: true }
        ]} />
      </FormProvider> : disabledMessage}

    </>
  )
}

export default CommentList